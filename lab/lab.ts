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
      speciality: "BLOOD",
      startTime: "08:00",
      endTime: "17:00",
    },
    {
      id: "T002",
      name: "BOB",
      speciality: "URINE",
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
      name: "Urine Analyzer",
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
interface ISampleSorter {
  sort(samples: TypeSample[]): TypeSample[];
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
  totalTime: string;
  efficiency: number;
  conflicts: number;
}

interface ISampleSorter {
  sort(samples: TypeSample[]): TypeSample[];
}

interface ITimeCalculator {
  calculateStartTime(
    arrivalTime: string,
    currentTime: number,
    technicianStartTime: string
  ): number;
  getEndTime(startTime: string, duration: number): string;
  timeToMinutes(time: string): number;
  minutesToTime(minutes: number): string;
}

interface IResourceFinder {
  findTechnician(sampleType: AnalyseType): TypeTechnician | null;
  findEquipment(sampleType: AnalyseType): TypeEquipment | null;
}

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
// console.dir(testSampleSorter.sort(dataSimple.samples), {
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
//   dataSimple.technicians,
//   dataSimple.equipment
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
// const testSample = dataSimple.samples[0];
// const testTechnician = dataSimple.technicians[0];
// const testEquipment = dataSimple.equipment[0];

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

  generateSchedule(data: LabData): {
    schedule: ScheduleItem[];
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
//   new ResourceFinder(dataSimple.technicians, dataSimple.equipment),
//   new SamplesOrderPriority(),
//   new CalculateTime(),
//   new ScheduleItemBuilder(new CalculateTime())
// );
// console.dir(labScheduler.generateSchedule(dataSimple), {
//   depth: null,
//   colors: true,
// });

