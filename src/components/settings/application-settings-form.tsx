
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const applicationSettingsFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).default("system"),
  enableInAppNotifications: z.boolean().default(true),
  defaultTaskView: z.enum(["list", "kanban", "calendar"]).default("list"),
});

type ApplicationSettingsFormValues = z.infer<typeof applicationSettingsFormSchema>;

// Mock current settings - in a real app, these would come from user preferences
const currentAppSettings: ApplicationSettingsFormValues = {
  theme: "system",
  enableInAppNotifications: true,
  defaultTaskView: "list",
};

export function ApplicationSettingsForm() {
  const { toast } = useToast();
  const form = useForm<ApplicationSettingsFormValues>({
    resolver: zodResolver(applicationSettingsFormSchema),
    defaultValues: currentAppSettings,
    mode: "onChange",
  });

  function onSubmit(data: ApplicationSettingsFormValues) {
    console.log("Application settings updated:", data);
    // Here you would typically save these settings to a backend or localStorage
    toast({
      title: "Settings Saved",
      description: "Your application preferences have been updated.",
    });
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Application Settings</CardTitle>
        <CardDescription>Configure your application-wide preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme Preference</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose how TaskPilot looks for you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defaultTaskView"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Task View</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select default task view" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="list">List View</SelectItem>
                      <SelectItem value="kanban">Kanban Board</SelectItem>
                      <SelectItem value="calendar">Calendar View</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set your preferred default view for the Tasks page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="enableInAppNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Enable In-App Notifications
                    </FormLabel>
                    <FormDescription>
                      Receive alerts for important updates within the app.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
              {form.formState.isSubmitting ? "Saving..." : "Save Application Settings"}
              <Save className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
