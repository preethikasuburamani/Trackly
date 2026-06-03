import { useEffect, useState } from "react";
import "./ApplicationPgae.scss";

import ApplicationService from "../../services/application.service";
import type { Application } from "../../types/application.types";
import ApplicationForm from "../../Components/applications/ApplicationForm";
import ApplicationList from "../../Components/applications/ApplicationList";



export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const userId = "test-user-id";

  const fetchApplications = async () => {
    const data = await ApplicationService.getAll(userId);
    setApplications(data as Application[]);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ✅ EDIT handler
  const handleEdit = (application: Application) => {
    setSelectedApplication(application);
  };

  // ✅ DELETE handler
  const handleDelete = async (id: string) => {
    await ApplicationService.delete(id);
    fetchApplications();
  };

  // ✅ After create/update success
  const handleSuccess = () => {
    setSelectedApplication(null);
    fetchApplications();
  };

  return (
    <div className="application-page">
      <h1>Applications</h1>

      <ApplicationForm
        userId={userId}
        application={selectedApplication}
        onSuccess={handleSuccess}
      />

    

      <ApplicationList
        applications={applications}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}