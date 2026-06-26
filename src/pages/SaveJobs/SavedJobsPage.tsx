import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import ApplicationService
from "../../services/application.service";

import SavedJobsService from "../../services/savedJobs.service";

import type { SavedJob } from "../../types/savedJob.types";
import SavedJobList from "./SavedJobsList";

export default function SavedJobsPage() {
  const { user } = useAuth();

  const navigate = useNavigate();
  const [jobs, setJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    if (!user) return;

    try {
      const data = await SavedJobsService.getSavedJobs(user.uid);

      console.log("Firebase Jobs:", data);

      setJobs(data as SavedJob[]);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, [user]);

  const handleDelete = async (id: string) => {
    await SavedJobsService.removeSavedJob(id);

    loadJobs();
  };

  if (loading) {
    return (
      <h2 style={{ padding: "40px" }}>
        Loading Saved Jobs...
      </h2>
    );
  }


  const handleApply = async (
  job: SavedJob
) => {

  await ApplicationService.create({

    company: job.company,

    role: job.role,

    location: job.location,

    jobUrl: job.jobUrl,

    status: "Applied",

    appliedDate:
      new Date()
        .toISOString()
        .split("T")[0],

    interviewDate: "",

    createdAt:
      new Date().toISOString(),

    userId: user!.uid,
  });

  await SavedJobsService.removeSavedJob(
    job.id!
  );

  navigate("/application");
};

  return (
    <div className="saved-jobs-page">
      <h1>Saved Jobs</h1>

      <SavedJobList
        jobs={jobs}
        onDelete={handleDelete}
        onApply={handleApply}
      />
    </div>
  );
}