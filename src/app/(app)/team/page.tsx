
"use client";

import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/common/data-table";
import { teamColumns } from "@/components/team/columns";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import type { TeamMember } from "@/types";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link"; // Import Link

// Mock data for team members
const mockTeamMembers: TeamMember[] = [
  { id: "USR-001", name: "Alice Wonderland", email: "alice@taskpilot.com", role: "Project Manager", avatarUrl: "https://placehold.co/40x40.png?text=AW", joinedDate: "2023-01-15T00:00:00.000Z" },
  { id: "USR-002", name: "Bob The Builder", email: "bob@taskpilot.com", role: "Lead Developer", avatarUrl: "https://placehold.co/40x40.png?text=BB", joinedDate: "2022-11-20T00:00:00.000Z" },
  { id: "USR-003", name: "Charlie Brown", email: "charlie@taskpilot.com", role: "UX Designer", avatarUrl: "https://placehold.co/40x40.png?text=CB", joinedDate: "2023-05-10T00:00:00.000Z" },
  { id: "USR-004", name: "Diana Prince", email: "diana@taskpilot.com", role: "Frontend Developer", joinedDate: "2023-08-01T00:00:00.000Z" },
  { id: "USR-005", name: "Edward Elric", email: "edward@taskpilot.com", role: "Backend Developer", avatarUrl: "https://placehold.co/40x40.png?text=EE", joinedDate: "2024-02-28T00:00:00.000Z" },
];

export default function TeamPage() {
  const { toast } = useToast();

  const handleExport = () => {
    console.log("Exporting team members:", mockTeamMembers);
    toast({
      title: "Export Initiated",
      description: "Team member data is being prepared for download.",
    });
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mockTeamMembers));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "team_members.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  
  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="Team Directory"
        description="View and manage your team members."
        actions={
          <Link href="/team/invite" passHref>
            <Button size="sm" asChild>
              <span> {/* Extra span needed for Button asChild with Icon */}
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </span>
            </Button>
          </Link>
        }
      />
      <DataTable
        columns={teamColumns}
        data={mockTeamMembers}
        searchKey="name or email" // Displayed in placeholder
        enableExport={true}
        onExport={handleExport}
      />
    </div>
  );
}
