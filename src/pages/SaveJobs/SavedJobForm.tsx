import type { SavedJob } from "../../types/savedJob.types";

interface Props {
  jobs: SavedJob[];

  onDelete: (
    id: string
  ) => void;
}

export default function SavedJobForm({
  jobs,
  onDelete,
}: Props) {

  if (!jobs || jobs.length === 0) {
  return (
    <div className="empty-state">
      <h3>No Saved Jobs Yet</h3>
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

        <div
          key={job.id}
          className="job-card"
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

          <a
            href={job.jobUrl}
            target="_blank"
            rel="noreferrer"
          >
            View Job
          </a>

          <button
            onClick={() =>
              onDelete(job.id!)
            }
          >
            Remove
          </button>

        </div>

      ))}

    </div>
  );
}