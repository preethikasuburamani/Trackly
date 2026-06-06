import type { Application } from "../../types/application.types";

interface Props {
  applications: Application[];
}

export default function RecentApplications({
  applications,
}: Props) {

  return (
    <div className="dashboard-card recent-card">

      <h3>
        Recent Applications
      </h3>

      <table>

        <thead>

          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {applications
            .slice(0, 5)
            .map((app) => (

              <tr key={app.id}>

                <td>
                  {app.company}
                </td>

                <td>
                  {app.role}
                </td>

                <td>
                  {app.status}
                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>
  );
}