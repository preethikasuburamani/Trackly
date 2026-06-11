import type { SavedJob } from "../../types/savedJob.types";

interface Props {
  jobs: SavedJob[];

  onDelete: (
    id: string
  ) => void;
}

export default function SavedJobList({
  jobs,
  onDelete,
}: Props) {
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

          <p>{job.role}</p>

          <p>{job.location}</p>

          <a
            href={job.jobUrl}
            target="_blank"
          >
            View Job
          </a>

          <button
            onClick={() =>
              onDelete(
                job.id!
              )
            }
          >
            Remove
          </button>
        </div>

      ))}
    </div>
  );
}