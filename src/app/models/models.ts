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
  emailVerified?: boolean;
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
  taskId?: number;
}

export interface Profile {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  university: string;
  joinDate: string;
  photoUrl?: string;
}

/** The signed-in user's own record, from GET /api/auth/me. */
export interface MeProfile {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  roleName: 'SuperAdmin' | 'Admin' | 'Trainee' | string;
  department: string;
  phone: string;
  university: string;
  internshipProgram: string;
  joinDate: string;
  status: string;
  emailVerified: boolean;
  mustChangePassword: boolean;
  hasProfilePhoto?: boolean;
}

export interface DashboardBreakdown {
  label: string;
  count: number;
}

export interface DashboardRecentTask {
  id: number;
  title: string;
  traineeName: string;
  dueDate: string;
  status: TaskStatus;
}

export interface AdminDashboardSummary {
  currentYear: number;
  scopeLabel: string;
  isSuperAdmin: boolean;
  totalTrainees: number;
  currentYearTrainees: number;
  activeTrainees: number;
  inactiveTrainees: number;
  verifiedTrainees: number;
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  needsChangesTasks: number;
  completionRate: number;
  internshipDepartments: string[];
  topDepartment: string | null;
  departmentBreakdown: DashboardBreakdown[];
  universityBreakdown: DashboardBreakdown[];
  internshipProgramBreakdown: DashboardBreakdown[];
  recentTasks: DashboardRecentTask[];
}
