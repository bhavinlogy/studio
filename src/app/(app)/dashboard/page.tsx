import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, CheckCircle, ListChecks, Users, ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import Image from 'next/image';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  description?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  imageSrc?: string;
  imageAlt?: string;
  aiHint?: string;
}

function MetricCard({ title, value, icon: Icon, description, trend, trendDirection = 'neutral', imageSrc, imageAlt, aiHint }: MetricCardProps) {
  const trendColor = trendDirection === 'up' ? 'text-green-600' : trendDirection === 'down' ? 'text-red-600' : 'text-muted-foreground';
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <p className={`text-xs ${trendColor} mt-1 flex items-center`}>
            {trendDirection === 'up' && <ArrowUpRight className="h-3 w-3 mr-1" />}
            {trendDirection === 'down' /* && <ArrowDownRight className="h-3 w-3 mr-1"/> */ } {/* Add ArrowDownRight if needed */}
            {trend}
          </p>
        )}
        {imageSrc && (
          <div className="mt-4">
            <Image 
              src={imageSrc} 
              alt={imageAlt || title} 
              width={300} 
              height={150} 
              className="rounded-md object-cover w-full h-auto" 
              data-ai-hint={aiHint || "analytics chart"}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const summaryCards = [
    { title: "Active Tasks", value: "72", icon: ListChecks, description: "Tasks currently in progress or to do.", trend: "+5 from last week", trendDirection: 'up' as const },
    { title: "Tasks Completed", value: "128", icon: CheckCircle, description: "Total tasks marked as done this month.", trend: "+12% from last month", trendDirection: 'up' as const },
    { title: "Team Members", value: "8", icon: Users, description: "Active members in your workspace." },
    { title: "Overall Progress", value: "65%", icon: TrendingUp, description: "Project completion rate across all tasks.", imageSrc: "https://placehold.co/600x300.png", imageAlt: "Progress chart", aiHint: "progress chart" },
    { title: "Pending Reviews", value: "4", icon: Activity, description: "Tasks awaiting your review or approval." },
    { title: "Average Task Duration", value: "3.5 days", icon: Clock, description: "Avg. time to complete tasks." }
  ];

  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your team's activity."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <MetricCard 
            key={card.title} 
            title={card.title} 
            value={card.value} 
            icon={card.icon} 
            description={card.description}
            trend={card.trend}
            trendDirection={card.trendDirection}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            aiHint={card.aiHint}
          />
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team members and tasks.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for recent activity feed */}
            <ul className="space-y-3">
              <li className="text-sm">John Doe completed "Design new landing page".</li>
              <li className="text-sm">Jane Smith started "Develop API endpoints".</li>
              <li className="text-sm">New task "Client meeting brief" assigned to Mike Johnson.</li>
            </ul>
            <Button variant="outline" className="mt-4">View All Activity</Button>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks that are due soon.</CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for upcoming deadlines */}
            <ul className="space-y-3">
              <li className="text-sm">"Finalize Q3 report" - Due in 2 days</li>
              <li className="text-sm">"User testing session" - Due in 5 days</li>
            </ul>
            <Link href="/tasks?filter=upcoming" passHref>
                <Button variant="outline" className="mt-4">View All Tasks</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// For Link passHref behavior with Shadcn Button (if Button uses Slot)
import Link from 'next/link';
