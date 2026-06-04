import { useEffect, useState } from "react";

import moment from "moment";

import {
  Calendar,
  momentLocalizer,
} from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import ApplicationService from "../../services/application.service";

import type { Application } from "../../types/application.types";

const localizer =
  momentLocalizer(moment);

interface CalendarEvent {
  title: string;

  start: Date;

  end: Date;

  resource: Application;
}

export default function CalendarPage() {
  const [events, setEvents] =
    useState<CalendarEvent[]>([]);

  const [loading, setLoading] =
    useState(true);

  const userId =
    "test-user-id";

  useEffect(() => {
    loadCalendarEvents();
  }, []);

  const loadCalendarEvents =
    async () => {
      try {
        const applications =
          await ApplicationService.getAll(
            userId
          );

        const calendarEvents =
          applications
                    .filter(
        (app) =>
            app.interviewDate &&
            app.status === "Interview"
        )
            .map(
              (
                app: Application
              ) => ({
                title: `${app.company} - ${app.role}`,

                start:
                  new Date(
                    app.interviewDate!
                  ),

                end:
                  new Date(
                    app.interviewDate!
                  ),

                resource: app,
              })
            );

        setEvents(
          calendarEvents
        );
      } catch (error) {
        console.error(
          "Calendar Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  const handleSelectEvent = (
    event: CalendarEvent
  ) => {
    alert(`
Company: ${event.resource.company}

Role: ${event.resource.role}

Location: ${event.resource.location}

Status: ${event.resource.status}
`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        Interview Calendar
      </h1>

      <div
        style={{
          height: "80vh",
        }}
      >
        <Calendar
          localizer={
            localizer
          }
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          popup
          onSelectEvent={
            handleSelectEvent
          }
        />
      </div>
    </div>
  );
}