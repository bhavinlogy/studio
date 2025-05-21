
"use client";

import * as React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/common/data-table";
import { projectColumns } from "@/components/projects/columns"; // To be created
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { Project } from "@/types";
import { useToast } from "@/hooks/use-toast";

// Mock data for projects
const mockProjects: Project[] = [
  { 
    id: "PROJ-001", 
    name: "Website Redesign", 
    description: "Complete overhaul of the company website.",
    status: "Active", 
    startDate: "2024-05-01T00:00:00.000Z", 
    endDate: "2024-10-31T00:00:00.000Z", 
    owner: { id: "USR-001", name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png?text=AW" },
    createdAt: "2024-04-15T00:00:00.000Z", 
    updatedAt: "2024-05-10T00:00:00.000Z" 
  },
  { 
    id: "PROJ-002", 
    name: "Mobile App Development", 
    description: "Develop a new mobile application for iOS and Android.",
    status: "Planning", 
    startDate: "2024-09-01T00:00:00.000Z",
    owner: { id: "USR-002", name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png?text=BT" },
    createdAt: "2024-07-01T00:00:00.000Z", 
    updatedAt: "2024-07-20T00:00:00.000Z" 
  },
  { 
    id: "PROJ-003", 
    name: "Q4 Marketing Campaign", 
    status: "Completed", 
    startDate: "2023-10-01T00:00:00.000Z", 
    endDate: "2023-12-31T00:00:00.000Z", 
    owner: { id: "USR-003", name: "Charlie Brown", avatarUrl: "https://placehold.co/40x40.png?text=CB" },
    createdAt: "2023-09-01T00:00:00.000Z", 
    updatedAt: "2024-01-05T00:00:00.000Z" 
  },
   { 
    id: "PROJ-004", 
    name: "API Integration", 
    description: "Integrate third-party APIs for enhanced functionality.",
    status: "On Hold", 
    startDate: "2024-06-01T00:00:00.000Z", 
    owner: { id: "USR-001", name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png?text=AW" },
    createdAt: "2024-05-20T00:00:00.000Z", 
    updatedAt: "2024-06-15T00:00:00.000Z" 
  },
   { 
    id: "PROJ-005", 
    name: "Internal Wiki Setup", 
    description: "Create an internal knowledge base for the team.",
    status: "Cancelled", 
    startDate: "2024-03-01T00:00:00.000Z", 
    endDate: "2024-04-30T00:00:00.000Z", 
    owner: { id: "USR-002", name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png?text=BT" },
    createdAt: "2024-02-15T00:00:00.000Z", 
    updatedAt: "2024-03-10T00:00:00.000Z" 
  },
];

export default function ProjectsPage() {
  const { toast } = useToast();

  const handleExport = () => {
    console.log("Exporting projects:", mockProjects);
    toast({
      title: "Export Initiated",
      description: "Project data is being prepared for download.",
    });
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mockProjects));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "projects.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  
  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="Projects"
        description="Manage and track all your company projects."
        actions={
          <Link href="/projects/new" passHref>
            <Button size="sm" asChild>
              <span> 
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </span>
            </Button>
          </Link>
        }
      />
      <DataTable
        columns={projectColumns}
        data={mockProjects}
        searchKey="name" 
        enableExport={true}
        onExport={handleExport}
        // Add customFilters if needed for projects (e.g., by status)
      />
    </div>
  );
}
