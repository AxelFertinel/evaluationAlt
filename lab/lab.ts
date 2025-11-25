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



class planifyLab {}

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
