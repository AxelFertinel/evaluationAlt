import { LabData } from "../interface/LabInterface";

export const data: LabData = {
  samples: [
    {
      id: "S001",
      type: "BLOOD",
      priority: "URGENT",
      analysisTime: 60,
      arrivalTime: "09:00",
      patientId: "P001",
    },
    {
      id: "S002",
      type: "URINE",
      priority: "STAT",
      analysisTime: 30,
      arrivalTime: "09:15",
      patientId: "P002",
    },
    {
      id: "S003",
      type: "BLOOD",
      priority: "ROUTINE",
      analysisTime: 45,
      arrivalTime: "09:00",
      patientId: "P003",
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
      name: "Bob",
      speciality: "GENERAL",
      startTime: "08:00",
      endTime: "17:00",
    },
  ],
  equipment: [
    {
      id: "E001",
      name: "Blood analyzer",
      type: "BLOOD",
      available: true,
    },
    {
      id: "E002",
      name: "Urine analyzer",
      type: "URINE",
      available: true,
    },
  ],
};
