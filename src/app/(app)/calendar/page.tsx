import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import Image from "next/image";

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="Calendar"
        description="Schedule events, set reminders, and view task deadlines."
      />
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            <span>Event Calendar</span>
          </CardTitle>
          <CardDescription>
            This page is currently under development. Check back soon for calendar features!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <Image 
            src="https://placehold.co/600x400.png" 
            alt="Calendar placeholder" 
            width={600} 
            height={400}
            className="rounded-lg shadow-lg mb-6"
            data-ai-hint="calendar illustration"
          />
          <p className="text-lg text-muted-foreground">
            Exciting calendar features are coming soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
