
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type TaskStatus = 'To Do' | 'In Progress' | 'Blocked' | 'Done' | 'Cancelled';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: User;
  dueDate?: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  joinedDate: string; // ISO date string
};

export type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  description?: string;
};
