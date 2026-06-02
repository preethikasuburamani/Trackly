import type { Application } from "../../types/application.types";

interface Props {
  applications: Application[];
}

export default function ApplicationList({
  applications,
}: Props) {
  return (
    <table>

      <thead>
        <tr>
          <th>Company</th>
          <th>Role</th>
          <th>URL</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>

        {applications.map((app) => (
          <tr key={app.id}>
            <td>{app.company}</td>

            <td>{app.role}</td>

            <td>{app.jobUrl}</td>

            <td>{app.status}</td>

            <td>
              {app.appliedDate}
            </td>
          </tr>
        ))}

      </tbody>

    </table>
  );
}