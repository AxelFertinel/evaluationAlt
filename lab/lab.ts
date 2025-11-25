const dataSimple: LabData = {
  samples: [
    {
      id: "S001",
      type: "BLOOD",
      priority: "URGENT",
      analysisTime: 30,
      arrivalTime: "09:00",
      patientId: "P001",
    },
  ],
  technicians: [
    {
      id: "T001",
      name: "Alice Martin",
      speciality: "BLOOD",
      startTime: "08:00",
      endTime: "17:00",
    },
  ],
  equipment: [
    {
      id: "E001",
      name: "Analyseur Sang A",
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

class checkTypeSample {
  constructor(private sample: TypeSample) {}

  public priority(): any {}
  public type(): any {}
}

class checkTechnician {
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
  public generateSchedule(): any {
    // Implémentation de la génération du planning
    const sample = this.data.samples[0];
    const technician = this.data.technicians[0];
    const equipment = this.data.equipment[0];
    const schedule = {
      schedule: [
        {
          sampleId: sample?.id,
          technicianId: technician?.id,
          equipmentId: equipment?.id,
          startTime: sample?.arrivalTime ?? "00:00",
          endTime: new calculateEndTime(
            sample?.arrivalTime ?? "00:00",
            sample?.analysisTime ?? 0
          ).getEndTime(),
          priority: sample?.priority,
        },
      ],
      metrics: {
        totalTime: sample?.analysisTime,
        efficiency: 100.0,
        conflicts: 0,
      },
    };
    return schedule;
  }
}

const testLab = new planifyLab(dataSimple);
console.log(testLab.generateSchedule());

// const schedule = {
//   schedule: [
//     {
//       sampleId: "S001",
//       technicianId: "T001",
//       equipmentId: "E001",
//       startTime: "09:00",
//       endTime: "09:30",
//       priority: "URGENT",
//     },
//   ],
//   metrics: {
//     totalTime: 30, // Une seule analyse de 30min
//     efficiency: 100.0, // Ressources utilisées à 100%
//     conflicts: 0, // Aucun conflit
//   },
// };
