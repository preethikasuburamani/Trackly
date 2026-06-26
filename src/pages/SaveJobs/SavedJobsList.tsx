import "./SavedJobs.scss";
import type { SavedJob } from "../../types/savedJob.types";

interface Props {
  jobs: SavedJob[];
  onDelete: (id: string) => void;
   onApply: (job: SavedJob) => void;
}

export default function SavedJobList({
  jobs,
  onApply,
  onDelete,
}: Props) {
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Saved Jobs Yet</h2>

        <p>
          Save jobs from the Applications page
          and they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="saved-jobs-grid">
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.company}</h3>

          <p>{job.role}</p>

          <p>{job.location}</p>

          <a
            href={job.jobUrl}
            target="_blank"
            rel="noreferrer"
          >
            View Job
          </a>

                      <div className="actions">

              <button
                className="apply-btn"
                onClick={() => onApply(job)}
              >
                Apply
              </button>

              <button
                className="remove-btn"
                onClick={() => onDelete(job.id!)}
              >
                Remove
              </button>

            </div>
        </div>
      ))}
    </div>
  );
}