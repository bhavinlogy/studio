
import { PageHeader } from "@/components/common/page-header";
import { AddTaskForm } from "@/components/tasks/add-task-form";

export default function AddTaskPage() {
  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="Add New Task"
        description="Complete the form below to create a new task."
      />
      <AddTaskForm />
    </div>
  );
}
