import { useEffect, useState } from "react";

import ApplicationService from "../../services/application.service";
import ApplicationForm from "../../Components/applications/ApplicationForm";
import ApplicationList from "../../Components/applications/ApplicationList";

import { useAuth } from "../../context/AuthContext";

import type { Application } from "../../types/application.types";

export default function ApplicationsPage() {
  const { user } = useAuth();

  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  useEffect(() => {
    if (!user) return;

    fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    if (!user) return;

    const data = await ApplicationService.getAll(user.uid);

    setApplications(data);
  };

  const handleEdit = (application: Application) => {
    setSelectedApplication(application);
  };

  const handleDelete = async (id: string) => {
    await ApplicationService.delete(id);

    fetchApplications();
  };

  const handleSuccess = () => {
    setSelectedApplication(null);

    fetchApplications();
  };

  if (!user) {
    return <p>Please login</p>;
  }

  return (
    <div className="application-page">
      <h1>Applications</h1>

      <ApplicationForm
        userId={user.uid}
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