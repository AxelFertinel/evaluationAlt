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
      arrivalTime: "08:30",
      patientId: "P002",
    },
    {
      id: "S003",
      type: "BLOOD",
      priority: "STAT",
      analysisTime: 30,
      arrivalTime: "09:00",
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
      type: "BLOOD",
      name: "Analyseur Sang A",
      available: true,
    },
  ],
};

type priority = "STAT" | "URGENT" | "ROUTINE";
type analyseType = "BLOOD" | "URINE" | "TISSUE";
type technicians = "BLOOD" | "URINE" | "TISSUE" | "GENERAL";

interface TypeSample {
  id: string;
  type: analyseType;
  priority: priority;
  analysisTime: number;
  arrivalTime: string;
  patientId: string;
}

interface TypeTechnician {
  id: string;
  name: string;
  speciality: technicians;
  startTime: string;
  endTime: string;
}
interface TypeEquipment {
  id: string;
  name: string;
  type: analyseType;
  available: boolean;
}

interface LabData {
  samples: TypeSample[];
  technicians: TypeTechnician[];
  equipment: TypeEquipment[];
}

class checkSamples {
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

class checkTechnicians {
  constructor(private technician: TypeTechnician, private sample: TypeSample) {}
  public isValidSpeciality(): boolean {
    if (this.technician.speciality != this.sample.type) {
      return false;
    }
    return true;
  }

  public isAvailable(atTime: string): boolean {
    return (
      atTime >= this.technician.startTime && atTime <= this.technician.endTime
    );
  }
}

class checkEquipmentAvailability {
  constructor(private equipment: TypeEquipment) {}
  public isAvailable(): boolean {
    return this.equipment.available;
  }
}

class calculateEndTime {
  constructor(private startTime: string, private analysisTime: number) {}
  public getEndTime(): string {
    const timeParts = this.startTime.split(":");
    const hours = Number(timeParts[0]);
    const minutes = Number(timeParts[1]);
    const totalMinutes = hours * 60 + minutes + this.analysisTime;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
  }
}

class planifyLab {
  constructor(private data: LabData) {}

  public sampleOrderByPriority(): TypeSample[] {
    return this.data.samples.sort((a, b) => {
      const sampleA = new checkSamples(a);
      const sampleB = new checkSamples(b);

      const prioDiff = sampleA.priority() - sampleB.priority();
      if (prioDiff !== 0) return prioDiff;

      return sampleA.arrivalMinutes() - sampleB.arrivalMinutes();
    });
  }

  public generateSchedule(): any {
    const samples = this.sampleOrderByPriority();
    const technician = this.data.technicians[0];

    const equipment = this.data.equipment[0];
    if (!equipment?.available) {
      throw new Error("Equipment not available");
    }

    const schedule = {
      schedule: [
        samples.map((sample) => {
          const calcEndTime = new calculateEndTime(
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
      ],
      metrics: {
        totalTime: "xxx",
        efficiency: 100,
        conflicts: 0,
      },
    };
    return schedule.schedule[0];
  }
}

const testLab = new planifyLab(dataSimple);
console.log(testLab.generateSchedule());
