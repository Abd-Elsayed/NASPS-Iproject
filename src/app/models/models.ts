export type UserRole = 'admin' | 'trainee';
export type TraineeStatus = 'Active' | 'Inactive';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Needs Changes';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface Trainee {
  id: number;
  name: string;
  email: string;
  internshipProgram: string;
  phone: string;
  department: string;
  university: string;
  joinDate: string;
  status: TraineeStatus;
}

export interface TrainingTask {
  id: number;
  title: string;
  description: string;
  traineeId: number;
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
  attachment?: string;
  attachmentType?: string;
  attachmentSize?: number;
  instructions?: string;
  submission?: string;
  submissionName?: string;
  submissionType?: string;
  submissionSize?: number;
  adminReview?: string;
}

export interface AppNotification {
  id: number;
  category: 'Tasks' | 'System';
  message: string;
  time: string;
  read: boolean;
}

export interface Profile {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  university: string;
  joinDate: string;
}
