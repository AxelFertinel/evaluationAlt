import { data } from "./data/LabData.js";
import { AnalyseType, Priority, TechnicianSpeciality } from "./type/LabType.js";
import {
  TypeSample,
  TypeTechnician,
  TypeEquipment,
  LabData,
  ISampleSorter,
  ScheduleItem,
  ScheduleMetrics,
  ITimeCalculator,
} from "./interface/LabInterface.js";

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

// const testSampleSorter = new SamplesOrderPriority();
// console.dir(testSampleSorter.sort(data.samples), {
//   depth: null,
//   colors: true,
// });

class CalculateTime implements ITimeCalculator {
  calculateStartTime(
    arrivalTime: string,
    currentTime: number,
    technicianStartTime: string
  ): number {
    const arrivalMinutes = this.timeToMinutes(arrivalTime);
    const techStartMinutes = this.timeToMinutes(technicianStartTime);
    return Math.max(currentTime, arrivalMinutes, techStartMinutes);
  }

  getEndTime(startTime: string, duration: number): string {
    const startMinutes = this.timeToMinutes(startTime);
    return this.minutesToTime(startMinutes + duration);
  }

  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return Number(hours) * 60 + Number(minutes);
  }

  minutesToTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }
}

// const testCalculateTime = new CalculateTime();
// console.dir(testCalculateTime.getEndTime("09:00", 45), {
//   depth: null,
//   colors: true,
// });

// Trouve les ressources compatibles
class ResourceFinder implements IResourceFinder {
  constructor(
    private technicians: TypeTechnician[],
    private equipment: TypeEquipment[]
  ) {}

  findTechnician(sampleType: AnalyseType): TypeTechnician | null {
    return (
      this.technicians.find(
        (tech) =>
          tech.speciality === sampleType || tech.speciality === "GENERAL"
      ) || null
    );
  }

  findEquipment(sampleType: AnalyseType): TypeEquipment | null {
    return (
      this.equipment.find(
        (equip) => equip.type === sampleType && equip.available
      ) || null
    );
  }
}

// const testResourceFinder = new ResourceFinder(
//   data.technicians,
//   data.equipment
// );
// console.dir(testResourceFinder.findTechnician("BLOOD"), {
//   depth: null,
//   colors: true,
// });
// console.dir(testResourceFinder.findEquipment("BLOOD"), {
//   depth: null,
//   colors: true,
// });

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

// const testScheduleItemBuilder = new ScheduleItemBuilder(new CalculateTime());
// const testSample = data.samples[0];
// const testTechnician = data.technicians[0];
// const testEquipment = data.equipment[0];

// if (testSample && testTechnician && testEquipment) {
//   console.dir(
//     testScheduleItemBuilder.build(
//       testSample,
//       testTechnician,
//       testEquipment,
//       540
//     ),
//     { depth: null, colors: true }
//   );
// }

class LabScheduler {
  constructor(
    private resourceFinder: IResourceFinder,
    private sampleSorter: ISampleSorter,
    private timeCalculator: ITimeCalculator,
    private scheduleItemBuilder: ScheduleItemBuilder
  ) {}

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

    const metrics: ScheduleMetrics = {
      totalTime: this.timeCalculator.minutesToTime(currentTime),
      efficiency:
        schedule.length > 0
          ? Math.round((schedule.length / data.samples.length) * 100)
          : 0,
      conflicts: 0,
    };

    return { schedule };
  }

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

// const labScheduler = new LabScheduler(
//   new ResourceFinder(data.technicians, data.equipment),
//   new SamplesOrderPriority(),
//   new CalculateTime(),
//   new ScheduleItemBuilder(new CalculateTime())
// );
// console.dir(labScheduler.generateSchedule(data), {
//   depth: null,
//   colors: true,
// });

class planifyLab {
  static create(data: LabData): LabScheduler {
    const timeCalculator = new CalculateTime();
    const resourceFinder = new ResourceFinder(data.technicians, data.equipment);
    const sampleSorter = new SamplesOrderPriority();
    const scheduleItemBuilder = new ScheduleItemBuilder(timeCalculator);

    return new LabScheduler(
      resourceFinder,
      sampleSorter,
      timeCalculator,
      scheduleItemBuilder
    );
  }
}

// const testPlanifyLab = planifyLab.create(data);
// const resultPlanifyLab = testPlanifyLab.generateSchedule(data);
// console.dir(resultPlanifyLab, { depth: null, colors: true });

interface ScheduleResult {
  schedule: ScheduleItem[];
}

import * as fs from "fs";
import * as path from "path";

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

// Utilisation
const scheduler = planifyLab.create(data);
const result = scheduler.generateSchedule(data);
saveSchedule(result);
