import type { NavItem, TaskStatus, TaskPriority } from '@/types';
import { LayoutDashboard, ListChecks, Users, Settings, CalendarDays, BadgeCent, GanttChartSquare } from 'lucide-react';

export const APP_NAME = 'TaskPilot';

export const NAV_ITEMS_MAIN: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview of your tasks and team activity.',
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

export const STATUS_COLORS: Record<TaskStatus, string> = {
  'To Do': 'bg-gray-500 hover:bg-gray-600',
  'In Progress': 'bg-blue-500 hover:bg-blue-600',
  'Blocked': 'bg-orange-500 hover:bg-orange-600',
  'Done': 'bg-green-500 hover:bg-green-600',
  'Cancelled': 'bg-red-500 hover:bg-red-600',
};

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  'Low': 'bg-green-500 hover:bg-green-600',
  'Medium': 'bg-yellow-500 hover:bg-yellow-600 text-black',
  'High': 'bg-orange-500 hover:bg-orange-600',
  'Urgent': 'bg-red-500 hover:bg-red-600',
};

// Use a more distinct color for sidebar background to ensure it is visible against main content background
// Primary: #468B97, Background: #E8E8E8, Accent: #64B6AC.
// Sidebar background could be a very light shade of primary or a neutral off-white.
// Let's make sidebar primary color stand out for active items.
// Example: if main background is light gray, sidebar could be white or a slightly darker/contrasting shade.
