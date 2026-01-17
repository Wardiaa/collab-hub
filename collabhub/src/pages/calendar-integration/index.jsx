import React, { useState } from 'react';
import Header from '../../components/navigation/Header';
import CalendarHeader from './components/CalendarHeader';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import DayView from './components/DayView';
import AgendaView from './components/AgendaView';
import EventModal from './components/EventModal';
import EventDetailsModal from './components/EventDetailsModal';
import CalendarSidebar from './components/CalendarSidebar';

const CalendarIntegration = () => {
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarFilters, setCalendarFilters] = useState(['meeting', 'event', 'deadline', 'reminder']);

  const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1230b9d-1763294070661.png",
    avatarAlt: "Professional Asian woman with long black hair wearing navy blazer smiling at camera"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Lead Developer",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_177cc6f5c-1763296124186.png",
    avatarAlt: "Hispanic man with short dark hair and beard in casual blue shirt"
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "UX Designer",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_154d7c3fc-1763293328254.png",
    avatarAlt: "Caucasian woman with blonde hair in ponytail wearing white blouse"
  },
  {
    id: 4,
    name: "James Kim",
    role: "Marketing Lead",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b16a3183-1763293646072.png",
    avatarAlt: "Asian man with glasses and short black hair in formal gray suit"
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "HR Manager",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd5ce62d-1763301409883.png",
    avatarAlt: "African American woman with curly hair wearing professional red blazer"
  }];


  const [events, setEvents] = useState([
  {
    id: 1,
    title: "Q1 Planning Meeting",
    description: "Quarterly planning session to review goals and set objectives for the next quarter. All team leads required to attend.",
    startTime: new Date(2026, 0, 20, 10, 0)?.toISOString(),
    endTime: new Date(2026, 0, 20, 11, 30)?.toISOString(),
    location: "Conference Room A",
    type: "meeting",
    icon: "Users",
    videoLink: "https://meet.collabhub.com/q1-planning",
    attendees: [
    { ...teamMembers?.[0], status: "accepted" },
    { ...teamMembers?.[1], status: "accepted" },
    { ...teamMembers?.[3], status: "pending" }]

  },
  {
    id: 2,
    title: "Design Review",
    description: "Review new UI designs for the mobile app redesign project.",
    startTime: new Date(2026, 0, 20, 14, 0)?.toISOString(),
    endTime: new Date(2026, 0, 20, 15, 0)?.toISOString(),
    location: "Design Studio",
    type: "meeting",
    icon: "Palette",
    attendees: [
    { ...teamMembers?.[2], status: "accepted" },
    { ...teamMembers?.[0], status: "accepted" }]

  },
  {
    id: 3,
    title: "Project Deadline",
    description: "Final submission deadline for Phase 2 deliverables.",
    startTime: new Date(2026, 0, 22, 17, 0)?.toISOString(),
    endTime: new Date(2026, 0, 22, 17, 0)?.toISOString(),
    location: "",
    type: "deadline",
    icon: "AlertCircle",
    attendees: []
  },
  {
    id: 4,
    title: "Team Lunch",
    description: "Monthly team building lunch at the new Italian restaurant downtown.",
    startTime: new Date(2026, 0, 23, 12, 0)?.toISOString(),
    endTime: new Date(2026, 0, 23, 13, 30)?.toISOString(),
    location: "Bella Vista Restaurant",
    type: "event",
    icon: "Coffee",
    attendees: teamMembers?.map((m) => ({ ...m, status: "accepted" }))
  },
  {
    id: 5,
    title: "Client Presentation",
    description: "Present Q4 results and 2026 roadmap to key stakeholders.",
    startTime: new Date(2026, 0, 24, 15, 0)?.toISOString(),
    endTime: new Date(2026, 0, 24, 16, 30)?.toISOString(),
    location: "Executive Boardroom",
    type: "meeting",
    icon: "Presentation",
    videoLink: "https://meet.collabhub.com/client-presentation",
    attendees: [
    { ...teamMembers?.[0], status: "accepted" },
    { ...teamMembers?.[3], status: "accepted" }]

  },
  {
    id: 6,
    title: "Code Review Session",
    description: "Weekly code review for sprint deliverables.",
    startTime: new Date(2026, 0, 21, 11, 0)?.toISOString(),
    endTime: new Date(2026, 0, 21, 12, 0)?.toISOString(),
    location: "Dev Room 2",
    type: "meeting",
    icon: "Code",
    attendees: [
    { ...teamMembers?.[1], status: "accepted" }]

  },
  {
    id: 7,
    title: "Submit Timesheet",
    description: "Weekly timesheet submission reminder.",
    startTime: new Date(2026, 0, 24, 9, 0)?.toISOString(),
    endTime: new Date(2026, 0, 24, 9, 0)?.toISOString(),
    location: "",
    type: "reminder",
    icon: "Clock",
    attendees: []
  },
  {
    id: 8,
    title: "Sprint Planning",
    description: "Plan tasks and stories for the upcoming two-week sprint.",
    startTime: new Date(2026, 0, 27, 10, 0)?.toISOString(),
    endTime: new Date(2026, 0, 27, 12, 0)?.toISOString(),
    location: "Conference Room B",
    type: "meeting",
    icon: "ListChecks",
    videoLink: "https://meet.collabhub.com/sprint-planning",
    attendees: [
    { ...teamMembers?.[0], status: "accepted" },
    { ...teamMembers?.[1], status: "accepted" },
    { ...teamMembers?.[2], status: "pending" }]

  },
  {
    id: 9,
    title: "Marketing Campaign Launch",
    description: "Official launch of Q1 marketing campaign across all channels.",
    startTime: new Date(2026, 0, 28, 9, 0)?.toISOString(),
    endTime: new Date(2026, 0, 28, 9, 0)?.toISOString(),
    location: "",
    type: "event",
    icon: "Megaphone",
    attendees: [
    { ...teamMembers?.[3], status: "accepted" }]

  },
  {
    id: 10,
    title: "1-on-1 with Manager",
    description: "Monthly check-in and performance review discussion.",
    startTime: new Date(2026, 0, 29, 14, 0)?.toISOString(),
    endTime: new Date(2026, 0, 29, 14, 30)?.toISOString(),
    location: "Manager\'s Office",
    type: "meeting",
    icon: "UserCheck",
    attendees: [
    { ...teamMembers?.[4], status: "accepted" }]

  }]
  );

  const handleNavigate = (direction) => {
    const newDate = new Date(currentDate);

    if (currentView === 'month') {
      newDate?.setMonth(currentDate?.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (currentView === 'week') {
      newDate?.setDate(currentDate?.getDate() + (direction === 'next' ? 7 : -7));
    } else if (currentView === 'day') {
      newDate?.setDate(currentDate?.getDate() + (direction === 'next' ? 1 : -1));
    }

    setCurrentDate(newDate);
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleDateClick = (date) => {
    setCurrentDate(date);
    setCurrentView('day');
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      setEvents(events?.map((e) => e?.id === selectedEvent?.id ? { ...eventData, id: e?.id } : e));
    } else {
      const newEvent = {
        ...eventData,
        id: events?.length + 1,
        icon: eventData?.type === 'meeting' ? 'Users' :
        eventData?.type === 'deadline' ? 'AlertCircle' :
        eventData?.type === 'event' ? 'Calendar' : 'Clock',
        attendees: eventData?.attendees?.map((id) => {
          const member = teamMembers?.find((m) => m?.id === id);
          return { ...member, status: 'pending' };
        })
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events?.filter((e) => e?.id !== eventId));
  };

  const handleFilterChange = (typeId) => {
    setCalendarFilters((prev) =>
    prev?.includes(typeId) ?
    prev?.filter((id) => id !== typeId) :
    [...prev, typeId]
    );
  };

  const filteredEvents = events?.filter((event) => calendarFilters?.includes(event?.type));

  const upcomingEvents = filteredEvents?.filter((event) => new Date(event.startTime) >= new Date())?.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="order-2 lg:order-1">
            <CalendarSidebar
              onCreateEvent={handleCreateEvent}
              calendarFilters={calendarFilters}
              onFilterChange={handleFilterChange}
              upcomingEvents={upcomingEvents}
              onEventClick={handleEventClick} />

          </div>

          <div className="flex-1 order-1 lg:order-2">
            <CalendarHeader
              currentView={currentView}
              onViewChange={setCurrentView}
              currentDate={currentDate}
              onNavigate={handleNavigate}
              onTodayClick={handleTodayClick} />


            {currentView === 'month' &&
            <MonthView
              currentDate={currentDate}
              events={filteredEvents}
              onEventClick={handleEventClick}
              onDateClick={handleDateClick} />

            }

            {currentView === 'week' &&
            <WeekView
              currentDate={currentDate}
              events={filteredEvents}
              onEventClick={handleEventClick} />

            }

            {currentView === 'day' &&
            <DayView
              currentDate={currentDate}
              events={filteredEvents}
              onEventClick={handleEventClick} />

            }

            {currentView === 'agenda' &&
            <AgendaView
              events={filteredEvents}
              onEventClick={handleEventClick} />

            }
          </div>
        </div>
      </main>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        event={selectedEvent}
        onSave={handleSaveEvent}
        teamMembers={teamMembers} />


      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        event={selectedEvent}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent} />

    </div>);

};

export default CalendarIntegration;