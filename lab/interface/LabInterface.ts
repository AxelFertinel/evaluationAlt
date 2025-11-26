export interface TypeSample {
  id: string;
  type: AnalyseType;
  priority: Priority;
  analysisTime: number;
  arrivalTime: string;
  patientId: string;
}

export interface TypeTechnician {
  id: string;
  name: string;
  speciality: TechnicianSpeciality;
  startTime: string;
  endTime: string;
}

export interface TypeEquipment {
  id: string;
  name: string;
  type: AnalyseType;
  available: boolean;
}

export interface LabData {
  samples: TypeSample[];
  technicians: TypeTechnician[];
  equipment: TypeEquipment[];
}

export interface ISampleSorter {
  sort(samples: TypeSample[]): TypeSample[];
}

export interface ScheduleItem {
  sampleId: string;
  technicianId: string;
  equipmentId: string;
  startTime: string;
  endTime: string;
  priority: Priority;
}

export interface ScheduleMetrics {
  totalTime: string;
  efficiency: number;
  conflicts: number;
}

export interface ISampleSorter {
  sort(samples: TypeSample[]): TypeSample[];
}

export interface ITimeCalculator {
  calculateStartTime(
    arrivalTime: string,
    currentTime: number,
    technicianStartTime: string
  ): number;
  getEndTime(startTime: string, duration: number): string;
  timeToMinutes(time: string): number;
  minutesToTime(minutes: number): string;
}

export interface IResourceFinder {
  findTechnician(sampleType: AnalyseType): TypeTechnician | null;
  findEquipment(sampleType: AnalyseType): TypeEquipment | null;
}
