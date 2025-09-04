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
  teachers?: number[]; // IDs de los profesores asociados a esta carrera
  duration?: {
    years: number;
    semesters: number;
  };
  currentSemester?: number;
  currentYear?: number;
  enrollment?: number; // Número de alumnos matriculados
}
