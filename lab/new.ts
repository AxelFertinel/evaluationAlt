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
    {
      id: "S003",
      type: "BLOOD",
      priority: "ROUTINE",
      analysisTime: 20,
      arrivalTime: "10:00",
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

// ============================================================================
// UTILITIES - Single Responsibility
// ============================================================================

class TimeHelper {
  static toMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return Number(hours) * 60 + Number(minutes);
  }

  static fromMinutes(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  static addMinutes(startTime: string, duration: number): string {
    return this.fromMinutes(this.toMinutes(startTime) + duration);
  }
}

// ============================================================================
// PRIORITY COMPARATOR - Single Responsibility
// ============================================================================

class SamplePriorityComparator {
  private priorityMap: Record<Priority, number> = {
    STAT: 1,
    URGENT: 2,
    ROUTINE: 3,
  };

  compare(a: TypeSample, b: TypeSample): number {
    const prioDiff =
      this.priorityMap[a.priority] - this.priorityMap[b.priority];
    if (prioDiff !== 0) return prioDiff;

    return (
      TimeHelper.toMinutes(a.arrivalTime) - TimeHelper.toMinutes(b.arrivalTime)
    );
  }
}

// ============================================================================
// SORTER - Single Responsibility
// ============================================================================

class SampleSorter {
  constructor(private comparator: SamplePriorityComparator) {}

  sort(samples: TypeSample[]): TypeSample[] {
    return [...samples].sort((a, b) => this.comparator.compare(a, b));
  }
}

// ============================================================================
// RESOURCE MATCHERS - Open/Closed Principle
// ============================================================================

interface IResourceMatcher<T> {
  canHandle(sample: TypeSample, resource: T): boolean;
}

class TechnicianMatcher implements IResourceMatcher<TypeTechnician> {
  canHandle(sample: TypeSample, technician: TypeTechnician): boolean {
    return (
      technician.speciality === sample.type ||
      technician.speciality === "GENERAL"
    );
  }
}

class EquipmentMatcher implements IResourceMatcher<TypeEquipment> {
  canHandle(sample: TypeSample, equipment: TypeEquipment): boolean {
    return equipment.available && equipment.type === sample.type;
  }
}

// ============================================================================
// RESOURCE FINDER - Single Responsibility + Liskov
// ============================================================================

class ResourceFinder<T> {
  constructor(private resources: T[], private matcher: IResourceMatcher<T>) {}

  find(sample: TypeSample): T | null {
    for (const resource of this.resources) {
      if (this.matcher.canHandle(sample, resource)) {
        return resource;
      }
    }
    return null;
  }
}

// ============================================================================
// AVAILABILITY MANAGER - Single Responsibility
// ============================================================================

class AvailabilityManager {
  private availability: Map<string, number> = new Map();

  constructor(initialAvailability: Map<string, number> = new Map()) {
    this.availability = new Map(initialAvailability);
  }

  getAvailableTime(resourceId: string): number {
    return this.availability.get(resourceId) || 0;
  }

  setAvailableTime(resourceId: string, time: number): void {
    this.availability.set(resourceId, time);
  }

  updateAvailability(resourceId: string, endTime: number): void {
    this.setAvailableTime(resourceId, endTime);
  }
}

// ============================================================================
// TIME SLOT CALCULATOR - Single Responsibility
// ============================================================================

class TimeSlotCalculator {
  calculate(
    sample: TypeSample,
    technicianId: string,
    equipmentId: string,
    techAvailability: AvailabilityManager,
    equipAvailability: AvailabilityManager
  ): { startMinutes: number; endMinutes: number } {
    const arrivalMinutes = TimeHelper.toMinutes(sample.arrivalTime);
    const techAvailable = techAvailability.getAvailableTime(technicianId);
    const equipAvailable = equipAvailability.getAvailableTime(equipmentId);

    const startMinutes = Math.max(
      arrivalMinutes,
      techAvailable,
      equipAvailable
    );
    const endMinutes = startMinutes + sample.analysisTime;

    return { startMinutes, endMinutes };
  }
}

// ============================================================================
// SCHEDULE ITEM FACTORY - Single Responsibility
// ============================================================================

class ScheduleItemFactory {
  create(
    sample: TypeSample,
    technician: TypeTechnician,
    equipment: TypeEquipment,
    startMinutes: number,
    endMinutes: number
  ): ScheduleItem {
    return {
      sampleId: sample.id,
      technicianId: technician.id,
      equipmentId: equipment.id,
      startTime: TimeHelper.fromMinutes(startMinutes),
      endTime: TimeHelper.fromMinutes(endMinutes),
      priority: sample.priority,
    };
  }
}

// ============================================================================
// METRICS CALCULATOR - Single Responsibility
// ============================================================================

class MetricsCalculator {
  calculate(schedule: ScheduleItem[], conflictCount: number): ScheduleMetrics {
    if (schedule.length === 0) {
      return { totalTime: "00:00", efficiency: 100, conflicts: conflictCount };
    }

    const startTimes = schedule.map((s) => TimeHelper.toMinutes(s.startTime));
    const endTimes = schedule.map((s) => TimeHelper.toMinutes(s.endTime));

    const totalMinutes = Math.max(...endTimes) - Math.min(...startTimes);
    const workTime = schedule.reduce(
      (sum, s) =>
        sum +
        (TimeHelper.toMinutes(s.endTime) - TimeHelper.toMinutes(s.startTime)),
      0
    );

    const efficiency = Math.round((workTime / totalMinutes) * 100);

    return {
      totalTime: TimeHelper.fromMinutes(totalMinutes),
      efficiency,
      conflicts: conflictCount,
    };
  }
}

// ============================================================================
// SCHEDULE BUILDER - Interface Segregation
// ============================================================================

interface IScheduleBuilder {
  buildSchedule(samples: TypeSample[]): ScheduleItem[];
  getConflictCount(): number;
}

class ScheduleBuilder implements IScheduleBuilder {
  private conflicts = 0;

  constructor(
    private technicianFinder: ResourceFinder<TypeTechnician>,
    private equipmentFinder: ResourceFinder<TypeEquipment>,
    private techAvailability: AvailabilityManager,
    private equipAvailability: AvailabilityManager,
    private timeSlotCalculator: TimeSlotCalculator,
    private itemFactory: ScheduleItemFactory
  ) {}

  buildSchedule(samples: TypeSample[]): ScheduleItem[] {
    const schedule: ScheduleItem[] = [];
    this.conflicts = 0;

    for (const sample of samples) {
      const item = this.scheduleSample(sample);
      if (item) {
        schedule.push(item);
      } else {
        this.conflicts++;
      }
    }

    return schedule;
  }

  getConflictCount(): number {
    return this.conflicts;
  }

  private scheduleSample(sample: TypeSample): ScheduleItem | null {
    const technician = this.technicianFinder.find(sample);
    const equipment = this.equipmentFinder.find(sample);

    if (!technician || !equipment) {
      console.warn(
        `⚠️  Cannot schedule sample ${sample.id}: missing resources`
      );
      return null;
    }

    const { startMinutes, endMinutes } = this.timeSlotCalculator.calculate(
      sample,
      technician.id,
      equipment.id,
      this.techAvailability,
      this.equipAvailability
    );

    this.techAvailability.updateAvailability(technician.id, endMinutes);
    this.equipAvailability.updateAvailability(equipment.id, endMinutes);

    return this.itemFactory.create(
      sample,
      technician,
      equipment,
      startMinutes,
      endMinutes
    );
  }
}

// ============================================================================
// MAIN SCHEDULER - Dependency Inversion
// ============================================================================

class LabScheduler {
  constructor(
    private sorter: SampleSorter,
    private scheduleBuilder: IScheduleBuilder,
    private metricsCalculator: MetricsCalculator
  ) {}

  generateSchedule(samples: TypeSample[]): {
    schedule: ScheduleItem[];
    metrics: ScheduleMetrics;
  } {
    const sortedSamples = this.sorter.sort(samples);
    const schedule = this.scheduleBuilder.buildSchedule(sortedSamples);
    const metrics = this.metricsCalculator.calculate(
      schedule,
      this.scheduleBuilder.getConflictCount()
    );

    return { schedule, metrics };
  }
}

// ============================================================================
// FACTORY - Dependency Injection
// ============================================================================

class LabSchedulerFactory {
  static create(data: LabData): LabScheduler {
    // Availability managers
    const techAvailability = new AvailabilityManager();
    data.technicians.forEach((tech) => {
      techAvailability.setAvailableTime(
        tech.id,
        TimeHelper.toMinutes(tech.startTime)
      );
    });

    const equipAvailability = new AvailabilityManager();
    data.equipment.forEach((equip) => {
      equipAvailability.setAvailableTime(equip.id, 0);
    });

    // Resource finders
    const technicianFinder = new ResourceFinder(
      data.technicians,
      new TechnicianMatcher()
    );
    
    const equipmentFinder = new ResourceFinder(
      data.equipment,
      new EquipmentMatcher()
    );

    // Builders and calculators
    const timeSlotCalculator = new TimeSlotCalculator();
    const itemFactory = new ScheduleItemFactory();
    const scheduleBuilder = new ScheduleBuilder(
      technicianFinder,
      equipmentFinder,
      techAvailability,
      equipAvailability,
      timeSlotCalculator,
      itemFactory
    );

    const sorter = new SampleSorter(new SamplePriorityComparator());
    const metricsCalculator = new MetricsCalculator();

    return new LabScheduler(sorter, scheduleBuilder, metricsCalculator);
  }
}

// ============================================================================
// USAGE
// ============================================================================

const scheduler = LabSchedulerFactory.create(dataSimple);
const result = scheduler.generateSchedule(dataSimple.samples);
console.dir(result, { depth: null, colors: true });
