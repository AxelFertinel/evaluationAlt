import { data } from "./data/LabData";
import { AnalyseType, Priority } from "./type/LabType.js";
import {
  TypeSample,
  TypeTechnician,
  TypeEquipment,
  LabData,
  ScheduleItem,
  ScheduleMetrics,
  ISampleSorter,
  ITimeCalculator,
  IResourceFinder,
  IMetricsCalculator,
  ScheduleResult,
} from "./interface/LabInterface.js";

// permet de trier les échantillons par priorité et heure d'arrivée
class SamplesOrderPriority implements ISampleSorter {
  sort(samples: TypeSample[]): TypeSample[] {
    return [...samples].sort((a, b) => {
      const priorityOrder: Record<Priority, number> = {
        STAT: 1,
        URGENT: 2,
        ROUTINE: 3,
      };

      const prioDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (prioDiff !== 0) return prioDiff;

      // Si même priorité, par ordre d'arrivée
      return (
        this.timeToMinutes(a.arrivalTime) - this.timeToMinutes(b.arrivalTime)
      );
    });
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return Number(hours) * 60 + Number(minutes);
  }
}

// permet de calculer les horaires de début et de fin des analyses
class CalculateTime implements ITimeCalculator {
  // Calcule l'heure de début en minutes
  calculateStartTime(
    arrivalTime: string,
    currentTime: number,
    technicianStartTime: string
  ): number {
    const arrivalMinutes = this.timeToMinutes(arrivalTime);
    const techStartMinutes = this.timeToMinutes(technicianStartTime);
    return Math.max(currentTime, arrivalMinutes, techStartMinutes);
  }
  // Calcule l'heure de fin au format HH:MM
  getEndTime(startTime: string, duration: number): string {
    const startMinutes = this.timeToMinutes(startTime);
    return this.minutesToTime(startMinutes + duration);
  }
  // Convertit une heure HH:MM en minutes
  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return Number(hours) * 60 + Number(minutes);
  }
  // Convertit des minutes en heure HH:MM
  minutesToTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }
}

// Trouve les ressources compatibles
class ResourceFinder implements IResourceFinder {
  constructor(
    private technicians: TypeTechnician[],
    private equipment: TypeEquipment[]
  ) {}
  // check si sample.type est compatible avec technician.speciality et equipement.type
  findTechnician(sampleType: AnalyseType): TypeTechnician | null {
    return (
      this.technicians.find(
        (tech) =>
          tech.speciality === sampleType || tech.speciality === "GENERAL"
      ) || null
    );
  }
  // check si equipement.available
  findEquipment(sampleType: AnalyseType): TypeEquipment | null {
    return (
      this.equipment.find(
        (equip) => equip.type === sampleType && equip.available
      ) || null
    );
  }
}

// Calcule les métriques de performance
class MetricsCalculator implements IMetricsCalculator {
  constructor(private timeCalculator: ITimeCalculator) {}

  calculate(schedule: ScheduleItem[], samples: TypeSample[]): ScheduleMetrics {
    if (schedule.length === 0) {
      return { totalTime: 0, efficiency: 0, conflicts: 0 };
    }

    const totalTime = this.calculateTotalTime(schedule);
    const analysisTime = this.calculateAnalysisTime(schedule, samples);
    const efficiency = this.calculateEfficiency(analysisTime, totalTime);

    return {
      totalTime,
      efficiency,
      conflicts: 0,
    };
  }

  private calculateTotalTime(schedule: ScheduleItem[]): number {
    const firstStart = this.timeCalculator.timeToMinutes(
      schedule[0]!.startTime
    );
    const lastEnd = this.timeCalculator.timeToMinutes(
      schedule[schedule.length - 1]!.endTime
    );
    return lastEnd - firstStart;
  }

  private calculateAnalysisTime(
    schedule: ScheduleItem[],
    samples: TypeSample[]
  ): number {
    return samples
      .filter((s) => schedule.some((sch) => sch.sampleId === s.id))
      .reduce((sum, s) => sum + s.analysisTime, 0);
  }

  private calculateEfficiency(analysisTime: number, totalTime: number): number {
    return totalTime > 0
      ? Math.round((analysisTime / totalTime) * 1000) / 10
      : 0;
  }
}

// permet d'organiser la création des items de planning
class ScheduleItemBuilder {
  constructor(private timeCalculator: ITimeCalculator) {}

  build(
    sample: TypeSample,
    technician: TypeTechnician,
    equipment: TypeEquipment,
    startTimeMinutes: number
  ): ScheduleItem {
    const startTime = this.timeCalculator.minutesToTime(startTimeMinutes);
    const endTime = this.timeCalculator.getEndTime(
      startTime,
      sample.analysisTime
    );

    return {
      sampleId: sample.id,
      technicianId: technician.id,
      equipmentId: equipment.id,
      startTime,
      endTime,
      priority: sample.priority,
    };
  }
}
// organise la création du planning
class LabScheduler {
  constructor(
    private resourceFinder: IResourceFinder,
    private sampleSorter: ISampleSorter,
    private timeCalculator: ITimeCalculator,
    private metricsCalculator: IMetricsCalculator,
    private scheduleItemBuilder: ScheduleItemBuilder
  ) {}
  // permet d'organiser la création des items de planning
  generateSchedule(data: LabData): ScheduleResult {
    const sortedSamples = this.sampleSorter.sort(data.samples);
    const schedule: ScheduleItem[] = [];
    let currentTime = 0;

    for (const sample of sortedSamples) {
      const scheduleItem = this.scheduleSample(sample, currentTime);

      if (scheduleItem) {
        schedule.push(scheduleItem);
        currentTime = this.timeCalculator.timeToMinutes(scheduleItem.endTime);
      }
    }

    const metrics = this.metricsCalculator.calculate(schedule, data.samples);
    
    return { schedule, metrics };
  }

  // permet d'organiser la création des items de planning
  private scheduleSample(
    sample: TypeSample,
    currentTime: number
  ): ScheduleItem | null {
    const technician = this.resourceFinder.findTechnician(sample.type);
    const equipment = this.resourceFinder.findEquipment(sample.type);

    if (!technician) {
      console.warn(
        `Aucun technicien disponible pour le type d'analyse ${sample.type} du prélèvement ${sample.id}`
      );
      return null;
    }
    if (!equipment) {
      console.warn(
        `Aucun équipement disponible pour le type d'analyse ${sample.type} du prélèvement ${sample.id}`
      );
      return null;
    }

    const startTimeMinutes = this.timeCalculator.calculateStartTime(
      sample.arrivalTime,
      currentTime,
      technician.startTime
    );

    return this.scheduleItemBuilder.build(
      sample,
      technician,
      equipment,
      startTimeMinutes
    );
  }
}
// permet de créer le planning
class planifyLab {
  static create(data: LabData): LabScheduler {
    const timeCalculator = new CalculateTime();
    const resourceFinder = new ResourceFinder(data.technicians, data.equipment);
    const sampleSorter = new SamplesOrderPriority();
    const metricsCalculator = new MetricsCalculator(timeCalculator);
    const scheduleItemBuilder = new ScheduleItemBuilder(timeCalculator);

    return new LabScheduler(
      resourceFinder,
      sampleSorter,
      timeCalculator,
      metricsCalculator,
      scheduleItemBuilder
    );
  }
}

import * as fs from "fs";
import * as path from "path";
// organise la création du planning et permet de sauvegarder le planning
async function saveSchedule(
  result: ScheduleResult,
  outputPath: string = "./schedule/schedule.json"
) {
  try {
    // Créer le dossier si nécessaire
    const dir = path.dirname(outputPath);
    fs.mkdirSync(dir, { recursive: true });

    // Sauvegarder le fichier
    const jsonContent = JSON.stringify(result, null, 2);
    fs.writeFileSync(outputPath, jsonContent, "utf-8");

    console.log(`✅ Schedule sauvegardé dans: ${outputPath}`);

    // Afficher un résumé
    console.log(`\n📊 Résumé:`);
    console.log(`   - ${result.schedule.length} échantillons planifiés`);

    return outputPath;
  } catch (error) {
    console.error("❌ Erreur lors de la sauvegarde:", error);
    throw error;
  }
}

// Utilisation de la planification du labo
const scheduler = planifyLab.create(data);
const result = scheduler.generateSchedule(data);
saveSchedule(result);
