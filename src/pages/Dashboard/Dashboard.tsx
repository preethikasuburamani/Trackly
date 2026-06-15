import { useEffect, useState } from "react";
import "./Dashboard.scss";
import { useNavigate } from "react-router-dom";

import ApplicationService from "../../services/application.service";

import StatsCards from "../../Components/dashboard/StatsCards";
import StatusChart from "../../Components/dashboard/StatusChart";
import UpcomingInterviews from "../../Components/dashboard/UpcomingInterviews";
import RecentApplications from "../../Components/dashboard/RecentApplications";

import { useAuth } from "../../context/AuthContext";

import type { Application } from "../../types/application.types";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] =
    useState<Application[]>([]);

  useEffect(() => {
    if (!user) return;

    loadData();
  }, [user]);

  const loadData = async () => {
    const data =
      await ApplicationService.getAll(
        user!.uid
      );

    setApplications(data);
  };

  const totalApplications =
    applications.length;

  const totalInterviews =
    applications.filter(
      (a) => a.status === "Interview"
    ).length;

  const totalOffers =
    applications.filter(
      (a) => a.status === "Offer"
    ).length;

  const totalRejected =
    applications.filter(
      (a) => a.status === "Rejected"
    ).length;

  const chartData = [
    {
      name: "Applied",
      value: applications.filter(
        (a) => a.status === "Applied"
      ).length,
    },
    {
      name: "Interview",
      value: totalInterviews,
    },
    {
      name: "Offer",
      value: totalOffers,
    },
    {
      name: "Rejected",
      value: totalRejected,
    },
  ];

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>
          <h1>Welcome Back 👋</h1>

          <p>
            Track your job applications
            and interviews.
          </p>
        </div>

        <div>
        <div className="application">
          <button onClick={() => navigate("/application")} className="btn Application-btn">
            + Application
          </button>
        </div>
        <div className="auth">
          <button onClick={() => navigate("/login")} className="btn">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="btn">
            Register
          </button>
        </div>
      </div>

      </div>

      <StatsCards
        totalApplications={
          totalApplications
        }
        totalInterviews={
          totalInterviews
        }
        totalOffers={
          totalOffers
        }
        totalRejected={
          totalRejected
        }
      />

      <div className="dashboard-row">

        <div className="dashboard-card">
          <h3>Application Status</h3>

          <StatusChart
            data={chartData}
          />
        </div>

        <UpcomingInterviews
          applications={
            applications
          }
        />

      </div>

      <RecentApplications
        applications={applications}
      />

    </div>
  );
}