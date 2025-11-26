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
      type: "URINE",
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
      speciality: "URINE",
      startTime: "08:00",
      endTime: "17:00",
    },
    {
      id: "T002",
      name: "Bob",
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
    {
      id: "E002",
      name: "Hematology Analyzer",
      type: "URINE",
      available: true,
    },
  ],
};

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

class SamplesInspector {
  constructor(private sample: TypeSample) {}

  // Retourne un numéro de priorité (plus petit = plus urgent)
  public priority(): number {
    switch (this.sample.priority) {
      case "STAT":
        return 1;
      case "URGENT":
        return 2;
      case "ROUTINE":
        return 3;
      default:
        return 99;
    }
  }

  // Convertit l'heure d'arrivée en minutes depuis minuit
  public arrivalMinutes(): number {
    const [hours, minutes] = this.sample.arrivalTime.split(":").map(Number);
    return Number(hours) * 60 + Number(minutes);
  }
}

class SamplesOrderPriority {
  constructor(private data: LabData) {}

  public sampleOrderByPriority(): TypeSample[] {
    return [...this.data.samples].sort((a, b) => {
      const sampleA = new SamplesInspector(a);
      const sampleB = new SamplesInspector(b);

      // D'abord par priorité
      const prioDiff = sampleA.priority() - sampleB.priority();
      if (prioDiff !== 0) return prioDiff;

      // Si même priorité, par ordre d'arrivée
      return sampleA.arrivalMinutes() - sampleB.arrivalMinutes();
    });
  }
}

class CalculateEndTime {
  constructor(private startTime: string, private analysisTime: number) {}

  public getEndTime(): string {
    const [hours, minutes] = this.startTime.split(":").map(Number);
    const totalMinutes =
      Number(hours) * 60 + Number(minutes) + this.analysisTime;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
  }

  // Convertit une heure en minutes
  public static timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return Number(hours) * 60 + Number(minutes);
  }

  // Convertit des minutes en heure
  public static minutesToTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }
}

// ===== CLASSE PRINCIPALE DE PLANIFICATION =====
class PlanifyLab {
  constructor(private data: LabData) {}

  // Trouve un technicien compatible avec le type d'échantillon
  private findCompatibleTechnician(
    sampleType: AnalyseType
  ): TypeTechnician | null {
    return (
      this.data.technicians.find(
        (tech) =>
          tech.speciality === sampleType || tech.speciality === "GENERAL"
      ) || null
    );
  }

  // Trouve un équipement compatible et disponible
  private findCompatibleEquipment(
    sampleType: AnalyseType
  ): TypeEquipment | null {
    return (
      this.data.equipment.find(
        (equip) => equip.type === sampleType && equip.available
      ) || null
    );
  }

  // Génère le planning complet
  public generateSchedule(): {
    schedule: ScheduleItem[];
    metrics: ScheduleMetrics;
  } {
    // 1. Trier les échantillons par priorité
    const samples = new SamplesOrderPriority(this.data).sampleOrderByPriority();

    const schedule: ScheduleItem[] = [];
    let currentTime = 0; // Heure courante en minutes depuis minuit

    // 2. Pour chaque échantillon, planifier son analyse
    for (const sample of samples) {
      const technician = this.findCompatibleTechnician(sample.type);
      const equipment = this.findCompatibleEquipment(sample.type);

      // Si pas de ressources compatibles, on skip
      if (!technician || !equipment) {
        console.warn(`Impossible de planifier ${sample.id}`);
        continue;
      }

      const arrivalMinutes = new SamplesInspector(sample).arrivalMinutes();
      const techStartMinutes = CalculateEndTime.timeToMinutes(
        technician.startTime
      );

      // L'échantillon commence au plus tard de :
      // - Son heure d'arrivée
      // - La fin de l'échantillon précédent
      // - Le début de service du technicien
      const startTimeMinutes = Math.max(
        currentTime,
        arrivalMinutes,
        techStartMinutes
      );

      const startTime = CalculateEndTime.minutesToTime(startTimeMinutes);
      const endTimeCalc = new CalculateEndTime(startTime, sample.analysisTime);
      const endTime = endTimeCalc.getEndTime();

      schedule.push({
        sampleId: sample.id,
        technicianId: technician.id,
        equipmentId: equipment.id,
        startTime,
        endTime,
        priority: sample.priority,
      });

      // On met à jour l'heure courante
      currentTime = CalculateEndTime.timeToMinutes(endTime);
    }

    // 3. Calculer les métriques
    const metrics = this.calculateMetrics(schedule);

    return { schedule, metrics };
  }

  // Calcule les métriques de performance
  private calculateMetrics(schedule: ScheduleItem[]): ScheduleMetrics {
    if (schedule.length === 0) {
      return { totalTime: 0, efficiency: 0, conflicts: 0 };
    }

    // Temps total : de la première heure de début à la dernière heure de fin
    const firstStart = CalculateEndTime.timeToMinutes(schedule[0]!.startTime);
    const lastEnd = CalculateEndTime.timeToMinutes(
      schedule[schedule.length - 1]!.endTime
    );
    const totalTime = lastEnd - firstStart;

    // Temps d'analyse : somme des durées de chaque échantillon
    const analysisTime = this.data.samples
      .filter((s) => schedule.some((sch) => sch.sampleId === s.id))
      .reduce((sum, s) => sum + s.analysisTime, 0);

    // Efficacité : temps d'analyse / temps total (en %)
    const efficiency =
      totalTime > 0 ? Math.round((analysisTime / totalTime) * 1000) / 10 : 0;

    // Conflits : on pourrait détecter des chevauchements, ici on met 0
    const conflicts = 0;

    return { totalTime, efficiency, conflicts };
  }
}

// ===== TEST =====
const testLab = new PlanifyLab(dataSimple);
const result = testLab.generateSchedule();
console.log(JSON.stringify(result, null, 2));
