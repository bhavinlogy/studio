
import type { LucideIcon } from "lucide-react";

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
  projectId?: string; // Optional: link task to a project
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

export type CalendarEventType = 'meeting' | 'class' | 'lab' | 'conference' | 'test' | 'project' | 'generic';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO string e.g. "2025-04-25"
  startTime: string; // e.g. "09:00"
  endTime: string; // e.g. "10:00"
  description?: string;
  location?: string;
  type: CalendarEventType;
  color: string; // Tailwind background color class e.g. 'bg-purple-500'
  icon: LucideIcon;
  attendees?: { id: string; name: string; avatarUrl?: string; dataAiHint?: string }[];
}

export type ProjectStatus = 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Cancelled';

export type Project = {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  owner: Pick<User, "id" | "name" | "avatarUrl">; // Simplified owner info
  teamMemberIds?: string[]; // For linking to TeamMember IDs
  // For more complex scenarios, you might have an array of User objects
  // tasks?: Pick<Task, "id" | "title" | "status">[]; // Simplified task info
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
