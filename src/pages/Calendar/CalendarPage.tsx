import { useEffect, useState } from "react";
import "./CalendarPage.scss";
import moment from "moment";

import {
  Calendar,
  momentLocalizer,
} from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import ApplicationService from "../../services/application.service";

import { useAuth } from "../../context/AuthContext";

import type { Application } from "../../types/application.types";

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  resource: Application;
}

export default function CalendarPage() {
  const { user } = useAuth();

  const [events, setEvents] =
    useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (!user) return;

    loadEvents();
  }, [user]);

  const loadEvents = async () => {
    const applications =
      await ApplicationService.getAll(
        user!.uid
      );

    const calendarEvents = applications
      .filter(
        (app) =>
          app.status === "Interview" &&
          app.interviewDate
      )
      .map((app) => ({
        title: `${app.company} - ${app.role}`,
        start: new Date(app.interviewDate!),
        end: new Date(app.interviewDate!),
        resource: app,
      }));

    setEvents(calendarEvents);
  };

  return (
    <div className="calendar-page">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}