import type { Application } from "../../types/application.types";

interface Props {
  applications: Application[];
}

export default function UpcomingInterviews({
  applications,
}: Props) {

  const interviews =
    applications.filter(
      app =>
        app.status === "Interview"
    );

  return (
    <div className="dashboard-card">

      <h3>
        Upcoming Interviews
      </h3>

      {interviews.map(app => (
        <div
          key={app.id}
          className="interview-item"
        >
          <h4>{app.company}</h4>

          <p>{app.role}</p>

          <span>
            {app.interviewDate}
          </span>
        </div>
      ))}

    </div>
  );
}