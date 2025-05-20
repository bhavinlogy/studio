
import { PageHeader } from "@/components/common/page-header";
import { InviteMemberForm } from "@/components/team/invite-member-form";

export default function InviteMemberPage() {
  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="Invite New Team Member"
        description="Expand your team by sending an invitation."
      />
      <InviteMemberForm />
    </div>
  );
}
