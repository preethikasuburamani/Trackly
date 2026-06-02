import "./ApplicationList.scss";
import type {
  Application,
} from "../../types/application.types";

interface Props {
  applications: Application[];

  onEdit: (
    application: Application
  ) => void;

  onDelete: (
    id: string
  ) => void;
}

export default function ApplicationList({
  applications,
  onEdit,
  onDelete,
}: Props) {
  if (
    applications.length === 0
  ) {
    return (
      <p>
        No Applications Found
      </p>
    );
  }



  //download csv
  const downloadCSV = () => {
  const headers = [
    "Company",
    "Role",
    "Location",
    "Status",
    "Job URL",
    "Applied Date"
  ];

  const rows = applications.map((app) => [
    app.company,
    app.role,
    app.location,
    app.status,
    app.jobUrl || "",
    app.appliedDate || ""
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) => row.map(String).join(","))
      .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "applications.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className="application-list">
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Role</th>
          <th>Location</th>
          <th>Status</th>
          <th>Job URL</th>
          <th>Applied Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {applications.map(
          (application) => (
            <tr
              key={
                application.id
              }
            >
              <td>
                {
                  application.company
                }
              </td>

              <td>
                {application.role}
              </td>

              <td>
                {
                  application.location
                }
              </td>

              <td>
                {
                  application.status
                }
              </td>

              <td>
                <a
                  href={
                    application.jobUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Job
                </a>
              </td>

                <td>
                {application.appliedDate}
                </td>
              <td>
                <button
                  onClick={() =>
                    onEdit(
                      application
                    )
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    application.id &&
                    onDelete(
                      application.id
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
    <button onClick={downloadCSV}>
  Download Applications
</button>
    </div>
  );
}