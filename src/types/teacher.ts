export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  classGroup: string;
  studentCount: number;
}

export interface GradeEntryData {
  studentId: string;
  grade: number | '';
  coefficient: number;
  comments?: string;
}

export interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export type ActiveTab = 'dashboard' | 'grades' | 'attendance';