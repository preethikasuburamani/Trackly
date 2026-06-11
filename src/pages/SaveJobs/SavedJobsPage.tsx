import {useEffect,useState,} from "react";
import { useAuth,} from "../../context/AuthContext";
import SavedJobsService from "../../services/savedJobs.service";
import type { SavedJob } from "../../types/savedJob.types";
import "./SavedJobs.scss";
import SavedJobForm from "./SavedJobForm";
import SavedJobList from "./SavedJobsList";


export default function SavedJobsPage() {
  const { user } =
    useAuth();

  const [jobs, setJobs] =
    useState<SavedJob[]>([]);

  useEffect(() => {
    if (!user) return;

    loadJobs();
  }, [user]);

  const loadJobs =
    async () => {
      const data =
        await SavedJobsService.getSavedJobs(
          user!.uid
        );

      setJobs(
        data as SavedJob[]
      );
    };

  const handleDelete =
    async (id: string) => {
      await SavedJobsService.removeSavedJob(
        id
      );

      loadJobs();
    };

  return (
    <div className="saved-jobs-page">

      <h1>
        Saved Jobs
      </h1>

      <SavedJobForm
        onSuccess={loadJobs}
      />

      <SavedJobList
        jobs={jobs}
        onDelete={
          handleDelete
        }
      />

    </div>
  );
}