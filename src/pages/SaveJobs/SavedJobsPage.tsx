import {
  useEffect,
  useState,
} from "react";

import SavedJobsService from "../../services/savedJobs.service";

import {
  useAuth,
} from "../../context/AuthContext";

export default function SavedJobsPage() {

  const { user } =
    useAuth();

  const [jobs, setJobs] =
    useState<any[]>([]);

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

      setJobs(data);
    };

  const removeJob =
    async (id: string) => {

      await SavedJobsService.removeSavedJob(
        id
      );

      loadJobs();
    };

  return (
    <div className="saved-jobs">

      <h1>
        Saved Jobs
      </h1>

      {jobs.map(job => (

        <div
          key={job.id}
          className="saved-job-card"
        >

          <h3>
            {job.company}
          </h3>

          <p>
            {job.role}
          </p>

          <p>
            {job.location}
          </p>

          <button
            onClick={() =>
              removeJob(
                job.id
              )
            }
          >
            Delete
          </button>

        </div>

      ))}
    </div>
  );
}