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
    return this.data.samples.sort((a, b) => {
      const sampleA = new SamplesInspector(a);
      const sampleB = new SamplesInspector(b);

      const prioDiff = sampleA.priority() - sampleB.priority();
      if (prioDiff !== 0) return prioDiff;

      return sampleA.arrivalMinutes() - sampleB.arrivalMinutes();
    });
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

// check si sample.type est compatible avec technician.speciality et equipement.type
// check si technician.startTime et endTime sont compatible avec sampale.arrivaleTime
// check si equipement.available
// un sample commence uniquement après que le précédent est terminé
// faire le calcul des metrics
// 

class planifyLab {
  constructor(private data: LabData) {}

  public generateSchedule(): any {
    const samples = new SamplesOrderPriority(this.data).sampleOrderByPriority();

    const technician = this.data.technicians[0];
    const equipment = this.data.equipment[0];

    const schedule = {
      schedule: samples.map((sample) => {
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
      metrics: {
        totalTime: "xxx",
        efficiency: 100,
        conflicts: 0,
      },
    };

    return schedule;
  }
}

const testLab = new planifyLab(dataSimple);
console.dir(testLab.generateSchedule(), { depth: null, colors: true });
