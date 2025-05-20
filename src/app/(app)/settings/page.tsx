import { PageHeader } from "@/components/common/page-header";
import { UserProfileForm } from "@/components/settings/user-profile-form";
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
          <TabsTrigger value="application" className="flex items-center gap-2" disabled>
             <SettingsIcon className="h-4 w-4" /> Application
          </TabsTrigger>
           <TabsTrigger value="billing" className="flex items-center gap-2" disabled>
             {/* <CreditCard className="h-4 w-4" /> Billing */}
             <span>Billing</span> {/* Using span until CreditCard icon is available or added */}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <UserProfileForm />
        </TabsContent>
        <TabsContent value="application">
          <div className="p-6 bg-card rounded-md shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">Application Settings</h3>
            <p className="text-muted-foreground">Application-wide settings will be available here in the future.</p>
            {/* Placeholder for application settings */}
          </div>
        </TabsContent>
         <TabsContent value="billing">
          <div className="p-6 bg-card rounded-md shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">Billing Information</h3>
            <p className="text-muted-foreground">Manage your subscription and payment methods.</p>
            {/* Placeholder for billing settings */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
