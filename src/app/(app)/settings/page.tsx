
import { PageHeader } from "@/components/common/page-header";
import { UserProfileForm } from "@/components/settings/user-profile-form";
import { ApplicationSettingsForm } from "@/components/settings/application-settings-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="Settings"
        description="Manage your account and application preferences."
      />
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:w-auto sm:inline-flex mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="application" className="flex items-center gap-2">
             <SettingsIcon className="h-4 w-4" /> Application
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <UserProfileForm />
        </TabsContent>
        <TabsContent value="application">
          <ApplicationSettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
