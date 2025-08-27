export interface Subject {
  name: string;
  description?: string;
}

export interface ScheduleSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Career {
  id: number;
  name: string;
  description: string;
  days: string[];
  schedule?: ScheduleSlot[];
  subjects?: Subject[];
}
