
"use client";

import * as React from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isEqual, isToday, parseISO, startOfWeek, addDays, isSameMonth } from "date-fns";
import { ChevronLeft, ChevronRight, Filter, PlusCircle, Edit3, Trash2, UsersRound, NotebookText, FlaskConical, ClipboardList, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CalendarEvent } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const mockEvents: CalendarEvent[] = [
  { id: "1", title: "Staff Meeting", date: "2025-04-25", startTime: "09:00", endTime: "10:00", location: "Conference Room 103", type: "meeting", color: "bg-purple-500", icon: UsersRound, attendees: [{id: "u1", name: "Alice", avatarUrl: "https://placehold.co/32x32.png?text=A", dataAiHint: "person avatar"}, {id: "u2", name: "Bob", avatarUrl: "https://placehold.co/32x32.png?text=B", dataAiHint: "person avatar"}] },
  { id: "2", title: "Science 101", date: "2025-04-25", startTime: "13:30", endTime: "15:00", location: "Room 205", description: "Topic: Introduction to Ecosystems", type: "class", color: "bg-blue-500", icon: NotebookText },
  { id: "3", title: "Lab Experiment: Plant Cells", date: "2025-04-28", startTime: "13:30", endTime: "15:00", location: "Science Lab", description: "Materials needed: microscopes, slides, plant samples", type: "lab", color: "bg-green-500", icon: FlaskConical },
  { id: "4", title: "Parent Conferences", date: "2025-05-05", startTime: "08:00", endTime: "12:00", type: "conference", color: "bg-purple-500", icon: UsersRound },
  { id: "5", title: "Parent Conferences", date: "2025-05-06", startTime: "13:00", endTime: "17:00", type: "conference", color: "bg-purple-500", icon: UsersRound },
  { id: "6", title: "Unit Test", date: "2025-05-10", startTime: "10:00", endTime: "11:00", type: "test", color: "bg-yellow-500", icon: ClipboardList },
  { id: "7", title: "Science Project Due", date: "2025-05-02", startTime: "17:00", endTime: "17:00", type: "project", color: "bg-sky-500", icon: Lightbulb },
  { id: "8", title: "Team Sync", date: "2025-04-21", startTime: "11:00", endTime: "11:30", type: "meeting", color: "bg-purple-500", icon: UsersRound },
  { id: "9", title: "History Lecture", date: "2025-04-23", startTime: "14:00", endTime: "15:30", type: "class", color: "bg-blue-500", icon: NotebookText },
  { id: "10", title: "Art Project Showcase", date: "2025-04-30", startTime: "09:00", endTime: "12:00", type: "project", color: "bg-pink-500", icon: Lightbulb },
  { id: "11", title: "Extra Event 1", date: "2025-04-25", startTime: "10:00", endTime: "11:00", type: "generic", color: "bg-red-500", icon: Lightbulb },
  { id: "12", title: "Extra Event 2", date: "2025-04-25", startTime: "11:00", endTime: "12:00", type: "generic", color: "bg-indigo-500", icon: Lightbulb },
  { id: "13", title: "Extra Event 3", date: "2025-04-25", startTime: "12:00", endTime: "13:00", type: "generic", color: "bg-teal-500", icon: Lightbulb },
];


export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2025, 3, 1)); // April 2025
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date(2025, 3, 25));
  const [viewMode, setViewMode] = React.useState<"Month" | "Week" | "Day" | "List">("Month");

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleToday = () => {
    const todayDate = new Date();
    setCurrentMonth(startOfMonth(todayDate));
    setSelectedDate(todayDate);
  };

  const firstDayOfGrid = startOfWeek(startOfMonth(currentMonth));
  const daysToDisplay = eachDayOfInterval({ start: firstDayOfGrid, end: addDays(firstDayOfGrid, 41) });


  const getEventsForDate = React.useCallback((date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return mockEvents.filter(event => event.date === dateString).sort((a,b) => a.startTime.localeCompare(b.startTime));
  }, []);
  
  const selectedDayEvents = selectedDate ? getEventsForDate(selectedDate) : [];
  
  const upcomingEvents = React.useMemo(() => {
    const clientToday = new Date();
    clientToday.setHours(0,0,0,0); 

    let startPointForUpcoming: Date;
    if (selectedDate && selectedDate >= clientToday) {
      startPointForUpcoming = addDays(selectedDate, 1);
    } else {
      startPointForUpcoming = clientToday;
    }
    startPointForUpcoming.setHours(0,0,0,0); // Ensure it's start of day

    return mockEvents
      .filter(event => {
          const eventDate = parseISO(event.date);
          eventDate.setHours(0,0,0,0); // Compare date part only
          return eventDate >= startPointForUpcoming;
      })
      .sort((a,b) => parseISO(a.date).getTime() - parseISO(b.date).getTime() || a.startTime.localeCompare(b.startTime))
      .slice(0,7); // Show next 7 upcoming events
  }, [selectedDate]);


  const DayCellContent = ({ date, displayMonth }: { date: Date, displayMonth: Date }) => {
    const isCurrentMonthDate = isSameMonth(date, displayMonth);
    const eventsOnDay = isCurrentMonthDate ? getEventsForDate(date) : [];
    const isSelected = selectedDate && isEqual(date, selectedDate);
  
    const cellClasses = `
      h-full flex flex-col p-2 border border-transparent rounded-md transition-colors cursor-pointer
      ${isCurrentMonthDate ?
        (isSelected ? 'border-primary bg-primary/10 shadow-inner' : 'hover:bg-accent/30') :
        (isSelected ? 'border-primary/40 bg-muted/40 shadow-inner' : 'bg-card hover:bg-muted/30') 
      }
       ${!isCurrentMonthDate && !isSelected ? 'text-muted-foreground/60' : ''} 
    `;
    
    const dayNumberClasses = `
      self-start mb-1 text-xs sm:text-sm
      ${isToday(date) && isCurrentMonthDate ? 'bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center font-bold' : ''}
      ${!isCurrentMonthDate && !isSelected ? 'text-muted-foreground/60' : ''}
      ${!isCurrentMonthDate && isSelected ? 'text-foreground/80' : ''}
    `;

    const dayCellRenderContent = (
      <div 
        className={cellClasses} 
        onClick={() => {
          setSelectedDate(date);
          if (!isCurrentMonthDate) {
            setCurrentMonth(startOfMonth(date));
          }
        }}
      >
        <span className={dayNumberClasses}>
          {format(date, "d")}
        </span>
        {isCurrentMonthDate && eventsOnDay.length > 0 && (
          <div className="flex-grow space-y-1 overflow-hidden">
            <div className="flex flex-wrap gap-1 justify-start items-center mt-1">
              {eventsOnDay.slice(0, 3).map(event => (
                <div key={event.id} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${event.color}`} title={event.title}></div>
              ))}
            </div>
            {eventsOnDay.length > 3 && (
                <div className="text-[10px] sm:text-xs text-muted-foreground text-center mt-0.5">
                +{eventsOnDay.length - 3} more
              </div>
            )}
          </div>
        )}
      </div>
    );

    if (isCurrentMonthDate && eventsOnDay.length > 0) {
      return (
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              {dayCellRenderContent}
            </TooltipTrigger>
            <TooltipContent className="bg-card shadow-xl p-3 border rounded-md w-64">
              <p className="font-semibold text-sm mb-2 text-foreground">{format(date, "MMMM d, yyyy")}</p>
              <ul className="space-y-1.5 max-h-48 overflow-y-auto">
                {eventsOnDay.map(event => (
                  <li key={event.id} className="text-xs flex items-start">
                    <span className={`w-2 h-2 rounded-full ${event.color} mr-2 shrink-0 mt-1`}></span>
                    <div className="flex-grow">
                      <span className="font-medium text-foreground block truncate">{event.title}</span>
                      <span className="text-muted-foreground">{event.startTime} - {event.endTime}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    return dayCellRenderContent; // Render without tooltip if no events or not current month
  };

  return (
    <div className="flex flex-col h-full p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {format(currentMonth, "MMMM yyyy")}
          </p>
        </div>
        <Button size="sm" onClick={() => console.log("Add new event")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth} className="h-8 w-8 sm:h-9 sm:w-9">
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth} className="h-8 w-8 sm:h-9 sm:w-9">
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button variant="outline" onClick={handleToday} className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm">Today</Button>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="outline" className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm" disabled>
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Filter
          </Button>
          <div className="flex items-center rounded-md border bg-muted p-0.5">
            {["Month", "Week", "Day", "List"].map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode(mode as any)}
                className={`h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm ${viewMode === mode ? 'shadow' : ''}`}
                disabled={mode !== "Month"}
              >
                {mode}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: Calendar Grid and Sidebar */}
      <div className="flex flex-1 flex-col lg:flex-row gap-4 sm:gap-6 min-h-0">
        {/* Calendar Grid (Month View) */}
        {viewMode === "Month" && (
          <Card className="flex-1 shadow-lg rounded-lg overflow-hidden flex flex-col">
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="grid grid-cols-7 sticky top-0 bg-card border-b z-10">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-muted-foreground">
                    {day.substring(0,3)}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 grid-rows-6 flex-1 gap-px bg-border overflow-y-auto">
                {daysToDisplay.map((day) => (
                  <div 
                    key={day.toISOString()} 
                    className="bg-card min-h-[calc((100vh-330px)/6)] sm:min-h-[calc((100vh-360px)/6)] md:min-h-[100px] lg:min-h-[120px]"
                  >
                    <DayCellContent date={day} displayMonth={currentMonth} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        {viewMode !== "Month" && (
          <div className="flex-1 flex items-center justify-center bg-card rounded-lg shadow-lg p-4">
            <p className="text-muted-foreground text-lg">{viewMode} view is not yet implemented.</p>
          </div>
        )}

        {/* Sidebar for Event Details */}
        <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
          <Card className="shadow-lg rounded-lg h-full flex flex-col max-h-[80vh] lg:max-h-none">
             <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-base sm:text-lg">
                {selectedDate ? format(selectedDate, "EEEE, MMMM dd") : "Schedule"}
              </CardTitle>
              {!selectedDate && <CardDescription className="text-xs text-muted-foreground">Select a day to see its schedule.</CardDescription>}
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 pt-0">
              <div className="space-y-4">
                {selectedDate && selectedDayEvents.length > 0 && (
                  <div>
                    <div className="space-y-3">
                      {selectedDayEvents.map(event => (<EventCard key={event.id} event={event} />))}
                    </div>
                  </div>
                )}
                
                {selectedDate && selectedDayEvents.length === 0 && (
                   <p className="text-xs sm:text-sm text-muted-foreground pt-2">No events scheduled for this day.</p>
                )}

                {upcomingEvents.length > 0 && (
                  <div>
                    {(selectedDate && selectedDayEvents.length > 0) && <Separator className="my-4" />}
                     <h3 className="text-sm font-semibold text-muted-foreground pt-2 mb-3">
                      Upcoming Events
                    </h3>
                    <div className="space-y-3">
                      {upcomingEvents.map(event => (
                        <EventCard key={event.id} event={event} showDate />
                      ))}
                    </div>
                  </div>
                )}

                {((!selectedDate && upcomingEvents.length === 0) || (selectedDate && selectedDayEvents.length === 0 && upcomingEvents.length === 0)) && (
                   <p className="text-xs sm:text-sm text-muted-foreground pt-2">
                     {selectedDate ? "No events for this day and no upcoming events." : "No upcoming events. Select a day to see its schedule."}
                   </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface EventCardProps {
  event: CalendarEvent;
  showDate?: boolean;
}

function EventCard({ event, showDate = false }: EventCardProps) {
  const EventIcon = event.icon;
  const { title, startTime, endTime, location, description, attendees } = event;

  return (
    <div className="p-3 rounded-lg flex gap-3 relative transition-colors hover:bg-muted/60 border border-transparent hover:border-accent/30">
      <div className={`w-1.5 flex-shrink-0 rounded-full ${event.color}`}></div>
      <div className="flex items-center justify-center shrink-0 h-8 w-8 rounded-full bg-muted">
        <EventIcon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="font-semibold text-sm truncate text-foreground">{title}</h4>
        {showDate && <p className="text-xs text-muted-foreground">{format(parseISO(event.date), "MMM dd, yyyy")}</p>}
        <p className="text-xs text-muted-foreground">{startTime} - {endTime}</p>
        {location && <p className="text-xs text-muted-foreground truncate">{location}</p>}
        {description && <p className="text-xs mt-1 truncate text-muted-foreground">{description}</p>}
        
        {attendees && attendees.length > 0 && (
          <div className="flex items-center space-x-1 mt-2">
            {attendees.slice(0,3).map(att => (
              <Avatar key={att.id} className="h-5 w-5 border-2 border-background">
                <AvatarImage src={att.avatarUrl} alt={att.name} data-ai-hint={att.dataAiHint || "person avatar"} />
                <AvatarFallback className="text-[10px]">{att.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {attendees.length > 3 && <span className="text-xs text-muted-foreground ml-0.5">+{attendees.length -3}</span>}
          </div>
        )}
        
        <div className="text-xs mt-2 flex items-center gap-3">
          <button onClick={() => console.log("Edit event:", event.id)} className="text-primary hover:underline flex items-center gap-1">
            <Edit3 className="h-3 w-3"/> Edit
          </button>
          <button onClick={() => console.log("Delete event:", event.id)} className="text-destructive hover:underline flex items-center gap-1">
            <Trash2 className="h-3 w-3"/> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
    
