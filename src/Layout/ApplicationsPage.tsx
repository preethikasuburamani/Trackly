import { useEffect } from "react";
import { useState } from "react";


import ApplicationService from "../services/application.service";

import type { Application } from "../types/application.types";
import ApplicationForm from "../Components/applications/ApplicationForm";
import ApplicationList from "../Components/applications/ApplicationList";


export default function ApplicationsPage() {

  const [applications, setApplications] =
    useState<Application[]>([]);

  const userId =
    "test-user-id";

  const fetchApplications =
    async () => {

      const data =
        await ApplicationService.getAll(
          userId
        );

      setApplications(
        data as Application[]
      );
    };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div>

      <h1>
        Applications
      </h1>

      <ApplicationForm
        userId={userId}
        onSuccess={
          fetchApplications
        }
      />

      <ApplicationList
        applications={
          applications
        }
      />

    </div>
  );
}