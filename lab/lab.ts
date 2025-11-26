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
  totalTime: string;
  efficiency: number;
  conflicts: number;
}
class SamplesInspector {
  constructor(private sample: TypeSample) {}

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

interface IResourceFinder {
  findTechnician(sampleType: AnalyseType): TypeTechnician | null;
  findEquipment(sampleType: AnalyseType): TypeEquipment | null;
}

// const testSamplesOrder = new SamplesOrderPriority(dataSimple);
// console.dir(testSamplesOrder.sampleOrderByPriority(), {
//   depth: null,
//   colors: true,
// });

class CalculateTime {
  constructor(private startTime: string, private analysisTime: number) {}
  // Calcule l'heure de fin en ajoutant le temps d'analyse au temps de début
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
// const testCalculateTime = new CalculateTime("09:00", 45);
// console.dir(testCalculateTime.getEndTime(), {
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

class planifyLab {
  constructor(private data: LabData) {}

  public generateSchedule(): any {
    const samples = new SamplesOrderPriority(this.data).sampleOrderByPriority();

    const technician = this.data.technicians[0];
    const equipment = this.data.equipment[0];

    const schedule = {
      schedule: samples.map((sample) => {
        const calcEndTime = new CalculateTime(
          sample.arrivalTime,
          sample.analysisTime
        );

        return {
          sampleId: sample?.id,
          technicianId: technician?.id,
          equipmentId: equipment?.id,
          startTime: sample?.arrivalTime,
          endTime: calcEndTime.getEndTime(),
          priority: sample?.priority,
        };
      }),
      metrics: {
        totalTime: "xxx",
        efficiency: 100,
        conflicts: 0,
      },
    };

    return schedule;
  }
}

// const testLab = new planifyLab(dataSimple);
// console.dir(testLab.generateSchedule(), { depth: null, colors: true });
