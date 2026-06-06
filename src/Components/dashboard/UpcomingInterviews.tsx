import type { Application } from "../../types/application.types";

interface Props {
  applications: Application[];
}

export default function UpcomingInterviews({
  applications,
}: Props) {

  const interviews =
    applications.filter(
      (app) =>
        app.status === "Interview"
    );

  return (
    <div className="dashboard-card">

      <h3>
        Upcoming Interviews
      </h3>

      {interviews.length === 0 && (
        <p>
          No interviews scheduled
        </p>
      )}

      {interviews.map((app) => (

        <div
          className="interview-item"
          key={app.id}
        >

          <h4>
            {app.company}
          </h4>

          <p>
            {app.role}
          </p>

          <span>
            {app.interviewDate}
          </span>

        </div>

      ))}

    </div>
  );
}