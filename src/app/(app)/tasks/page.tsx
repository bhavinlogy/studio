"use client";

import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/common/data-table";
import { taskColumns } from "@/components/tasks/columns";
import { TaskFilters } from "@/components/tasks/task-filters";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { Task, TaskStatus, TaskPriority } from "@/types";
import { useToast } from "@/hooks/use-toast";

// Mock data for tasks
const mockTasks: Task[] = [
  { id: "TASK-001", title: "Design homepage layout", status: "In Progress", priority: "High", assignee: { id: "USR-001", name: "Alice Wonderland", email:"a@b.com" }, dueDate: "2024-08-15T00:00:00.000Z", createdAt: "2024-07-01T00:00:00.000Z", updatedAt: "2024-07-05T00:00:00.000Z" },
  { id: "TASK-002", title: "Develop API for user authentication", status: "To Do", priority: "Urgent", assignee: { id: "USR-002", name: "Bob The Builder", email:"b@c.com" }, dueDate: "2024-08-01T00:00:00.000Z", createdAt: "2024-07-02T00:00:00.000Z", updatedAt: "2024-07-02T00:00:00.000Z" },
  { id: "TASK-003", title: "Write documentation for API", status: "To Do", priority: "Medium", createdAt: "2024-07-03T00:00:00.000Z", updatedAt: "2024-07-03T00:00:00.000Z" },
  { id: "TASK-004", title: "Test payment gateway integration", status: "Blocked", priority: "High", assignee: { id: "USR-001", name: "Alice Wonderland", email:"a@b.com" }, dueDate: "2024-08-20T00:00:00.000Z", createdAt: "2024-07-04T00:00:00.000Z", updatedAt: "2024-07-10T00:00:00.000Z" },
  { id: "TASK-005", title: "Deploy application to staging server", status: "Done", priority: "Medium", assignee: { id: "USR-003", name: "Charlie Brown", email:"c@d.com" }, dueDate: "2024-07-10T00:00:00.000Z", createdAt: "2024-06-20T00:00:00.000Z", updatedAt: "2024-07-09T00:00:00.000Z" },
  { id: "TASK-006", title: "User acceptance testing", status: "In Progress", priority: "Low", createdAt: "2024-07-11T00:00:00.000Z", updatedAt: "2024-07-12T00:00:00.000Z" },
  { id: "TASK-007", title: "Fix bugs from UAT", status: "To Do", priority: "Urgent", assignee: { id: "USR-002", name: "Bob The Builder", email:"b@c.com" }, dueDate: "2024-08-10T00:00:00.000Z", createdAt: "2024-07-15T00:00:00.000Z", updatedAt: "2024-07-15T00:00:00.000Z" },
  { id: "TASK-008", title: "Client demo preparation", status: "To Do", priority: "High", assignee: { id: "USR-001", name: "Alice Wonderland", email:"a@b.com" }, dueDate: "2024-08-25T00:00:00.000Z", createdAt: "2024-07-16T00:00:00.000Z", updatedAt: "2024-07-16T00:00:00.000Z" },
  { id: "TASK-009", title: "Update marketing materials", status: "Cancelled", priority: "Low", createdAt: "2024-07-05T00:00:00.000Z", updatedAt: "2024-07-18T00:00:00.000Z" },
  { id: "TASK-010", title: "Finalize project budget", status: "Done", priority: "Medium", assignee: { id: "USR-003", name: "Charlie Brown", email:"c@d.com" }, dueDate: "2024-07-01T00:00:00.000Z", createdAt: "2024-06-15T00:00:00.000Z", updatedAt: "2024-06-30T00:00:00.000Z" },
];


export default function TasksPage() {
  const { toast } = useToast();
  const [selectedStatuses, setSelectedStatuses] = React.useState<TaskStatus[]>([]);
  const [selectedPriorities, setSelectedPriorities] = React.useState<TaskPriority[]>([]);

  const filteredTasks = React.useMemo(() => {
    return mockTasks.filter(task => {
      const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(task.status);
      const priorityMatch = selectedPriorities.length === 0 || selectedPriorities.includes(task.priority);
      return statusMatch && priorityMatch;
    });
  }, [selectedStatuses, selectedPriorities]);

  const handleExport = () => {
    // This is a mock export function.
    // In a real app, you would generate a CSV or Excel file.
    console.log("Exporting tasks:", filteredTasks);
    toast({
      title: "Export Initiated",
      description: "Task data is being prepared for download.",
    });
    // Simulate file download
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredTasks));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "tasks.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="Task Management"
        description="Organize, track, and manage all your team's tasks."
        actions={
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Task
          </Button>
        }
      />
      <DataTable
        columns={taskColumns}
        data={filteredTasks}
        searchKey="title" // User can search by task title
        enableExport={true}
        onExport={handleExport}
        customFilters={
          <TaskFilters
            selectedStatuses={selectedStatuses}
            onStatusChange={setSelectedStatuses}
            selectedPriorities={selectedPriorities}
            onPriorityChange={setSelectedPriorities}
          />
        }
      />
    </div>
  );
}
