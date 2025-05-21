
import type { NavItem, TaskStatus, TaskPriority, ProjectStatus } from '@/types';
import { LayoutDashboard, ListChecks, Users, Settings, CalendarDays, FolderKanban } from 'lucide-react';

export const APP_NAME = 'TaskPilot';

export const NAV_ITEMS_MAIN: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview of your tasks and team activity.',
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: FolderKanban, // Added new icon
    description: 'Manage all your projects.',
  },
  {
    title: 'Tasks',
    href: '/tasks',
    icon: ListChecks,
    description: 'Manage all your tasks.',
  },
  {
    title: 'Team',
    href: '/team',
    icon: Users,
    description: 'View and manage your team members.',
  },
  {
    title: 'Calendar',
    href: '/calendar',
    icon: CalendarDays,
    description: 'Schedule events and view task deadlines.',
  },
];

export const NAV_ITEMS_SETTINGS: NavItem[] = [
 {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Configure your application and user preferences.',
  },
];


export const TASK_STATUSES: TaskStatus[] = ['To Do', 'In Progress', 'Blocked', 'Done', 'Cancelled'];
export const TASK_PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High', 'Urgent'];

export const PROJECT_STATUSES: ProjectStatus[] = ['Planning', 'Active', 'On Hold', 'Completed', 'Cancelled'];

export const USER_ROLES: string[] = ['Admin', 'Project Manager', 'Lead Developer', 'Developer', 'UX Designer', 'QA Tester', 'Intern'];

export const STATUS_COLORS: Record<TaskStatus | ProjectStatus, string> = {
  // Task Statuses
  'To Do': 'bg-gray-500 hover:bg-gray-600',
  'In Progress': 'bg-blue-500 hover:bg-blue-600',
  'Blocked': 'bg-orange-500 hover:bg-orange-600',
  'Done': 'bg-green-500 hover:bg-green-600',
  // Project Statuses (can share or have distinct colors)
  'Planning': 'bg-purple-500 hover:bg-purple-600',
  'Active': 'bg-sky-500 hover:bg-sky-600',
  'On Hold': 'bg-yellow-500 hover:bg-yellow-600 text-black', // Ensuring contrast for yellow
  'Completed': 'bg-green-600 hover:bg-green-700', // Slightly different green for distinction
  'Cancelled': 'bg-red-500 hover:bg-red-600',
};

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  'Low': 'bg-green-500 hover:bg-green-600',
  'Medium': 'bg-yellow-500 hover:bg-yellow-600 text-black',
  'High': 'bg-orange-500 hover:bg-orange-600',
  'Urgent': 'bg-red-500 hover:bg-red-600',
};
