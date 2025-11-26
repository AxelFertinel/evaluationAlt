// ===== DONNÉES DE TEST =====
const dataSimple: LabData = {
  samples: [
    {
      id: "S001",
      type: "BLOOD",
      priority: "URGENT",
      analysisTime: 45,
      arrivalTime: "09:00",
      patientId: "P001",
    },
    {
      id: "S002",
      type: "BLOOD",
      priority: "STAT",
      analysisTime: 30,
      arrivalTime: "09:30",
      patientId: "P002",
    },
  ],
  technicians: [
    {
      id: "T001",
      name: "Alice",
      speciality: "BLOOD",
      startTime: "08:00",
      endTime: "17:00",
    },
  ],
  equipment: [
    {
      id: "E001",
      name: "Hematology Analyzer",
      type: "BLOOD",
      available: true,
    },
  ],
};

// ===== TYPES =====
type Priority = "STAT" | "URGENT" | "ROUTINE";
type AnalyseType = "BLOOD" | "URINE" | "TISSUE";
type TechnicianSpeciality = "BLOOD" | "URINE" | "TISSUE" | "GENERAL";

interface TypeSample {
  id: string;
  type: AnalyseType;
  priority: Priority;
  analysisTime: number;
  arrivalTime: string;
  patientId: string;
}

interface TypeTechnician {
  id: string;
  name: string;
  speciality: TechnicianSpeciality;
  startTime: string;
  endTime: string;
}

interface TypeEquipment {
  id: string;
  name: string;
  type: AnalyseType;
  available: boolean;
}

interface LabData {
  samples: TypeSample[];
  technicians: TypeTechnician[];
  equipment: TypeEquipment[];
}

interface ScheduleItem {
  sampleId: string;
  technicianId: string;
  equipmentId: string;
  startTime: string;
  endTime: string;
  priority: Priority;
}

interface ScheduleMetrics {
  totalTime: number;
  efficiency: number;
  conflicts: number;
}

// ===== INTERFACES (Dependency Inversion Principle) =====

// Interface pour la recherche de ressources
interface IResourceFinder {
  findTechnician(sampleType: AnalyseType): TypeTechnician | null;
  findEquipment(sampleType: AnalyseType): TypeEquipment | null;
}

// Interface pour le tri des échantillons
interface ISampleSorter {
  sort(samples: TypeSample[]): TypeSample[];
}

// Interface pour le calcul du temps
interface ITimeCalculator {
  calculateStartTime(
    arrivalTime: string,
    currentTime: number,
    technicianStartTime: string
  ): number;
  calculateEndTime(startTime: string, duration: number): string;
  timeToMinutes(time: string): number;
  minutesToTime(minutes: number): string;
}

// Interface pour le calcul des métriques
interface IMetricsCalculator {
  calculate(schedule: ScheduleItem[], samples: TypeSample[]): ScheduleMetrics;
}

// ===== IMPLÉMENTATIONS =====

// 🎯 Single Responsibility : Trouve les ressources compatibles
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

// 🎯 Single Responsibility : Trie les échantillons par priorité
class PrioritySampleSorter implements ISampleSorter {
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

// 🎯 Single Responsibility : Gère tous les calculs de temps
class TimeCalculator implements ITimeCalculator {
  calculateStartTime(
    arrivalTime: string,
    currentTime: number,
    technicianStartTime: string
  ): number {
    const arrivalMinutes = this.timeToMinutes(arrivalTime);
    const techStartMinutes = this.timeToMinutes(technicianStartTime);
    return Math.max(currentTime, arrivalMinutes, techStartMinutes);
  }

  calculateEndTime(startTime: string, duration: number): string {
    const startMinutes = this.timeToMinutes(startTime);
    return this.minutesToTime(startMinutes + duration);
  }

  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  minutesToTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }
}

// 🎯 Single Responsibility : Calcule les métriques de performance
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
      conflicts: 0, // Peut être étendu plus tard
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

// 🎯 Single Responsibility : Crée un item de planning
class ScheduleItemBuilder {
  constructor(private timeCalculator: ITimeCalculator) {}

  build(
    sample: TypeSample,
    technician: TypeTechnician,
    equipment: TypeEquipment,
    startTimeMinutes: number
  ): ScheduleItem {
    const startTime = this.timeCalculator.minutesToTime(startTimeMinutes);
    const endTime = this.timeCalculator.calculateEndTime(
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

// 🎯 Open/Closed : Cette classe orchestre le tout
// Elle peut être étendue sans modification grâce aux interfaces
class LabScheduler {
  constructor(
    private resourceFinder: IResourceFinder,
    private sampleSorter: ISampleSorter,
    private timeCalculator: ITimeCalculator,
    private metricsCalculator: IMetricsCalculator,
    private scheduleItemBuilder: ScheduleItemBuilder
  ) {}

  generateSchedule(data: LabData): {
    schedule: ScheduleItem[];
    metrics: ScheduleMetrics;
  } {
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

  private scheduleSample(
    sample: TypeSample,
    currentTime: number
  ): ScheduleItem | null {
    const technician = this.resourceFinder.findTechnician(sample.type);
    const equipment = this.resourceFinder.findEquipment(sample.type);

    if (!technician || !equipment) {
      console.warn(`⚠️ Impossible de planifier ${sample.id}`);
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

// ===== FACTORY (facilite l'instanciation) =====
class LabSchedulerFactory {
  static create(data: LabData): LabScheduler {
    const timeCalculator = new TimeCalculator();
    const resourceFinder = new ResourceFinder(data.technicians, data.equipment);
    const sampleSorter = new PrioritySampleSorter();
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

// ===== UTILISATION =====
const scheduler = LabSchedulerFactory.create(dataSimple);
const result = scheduler.generateSchedule(dataSimple);
console.log(JSON.stringify(result, null, 2));
