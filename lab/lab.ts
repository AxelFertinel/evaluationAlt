const data = {
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
type analyseType = "BOOD" | "UNRINE" | "TISSUE";
type technicians = "BLOOD" | "URINE" | "TISSUE" | "GENERAL";

interface typeSample {
  id: string;
  type: analyseType;
  priority: priority;
  analysisTime: number;
  arrivalTime: string;
  patientId: string;
}

interface typeTechnician {
  id: string;
  name: string;
  speciality: technicians;
  startTime: string;
  endTime: string;
}
interface typeEquipment {
  id: string;
  name: string;
  type: analyseType;
  available: boolean;
}

