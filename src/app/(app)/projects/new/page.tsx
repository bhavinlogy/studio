
import { PageHeader } from "@/components/common/page-header";
import { AddProjectForm } from "@/components/projects/add-project-form"; // To be created

export default function AddProjectPage() {
  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="Create New Project"
        description="Fill in the details below to start a new project."
      />
      <AddProjectForm />
    </div>
  );
}
