import {
  useEffect,
  useState,
} from "react";

import ApplicationService from "../../services/application.service";
import StatsCards from "../../Components/dashboard/StatsCards";
import StatusChart from "../../Components/dashboard/StatusChart";
import { useAuth } from "../../context/AuthContext";

import type {
  Application,
} from "../../types/application.types";

export default function Dashboard() {
  const { user } =
    useAuth();

  const [
    applications,
    setApplications,
  ] = useState<
    Application[]
  >([]);

  useEffect(() => {
    if (!user) return;

    loadData();
  }, [user]);

  const loadData =
    async () => {
      const data =
        await ApplicationService.getAll(
          user!.uid
        );

      setApplications(
        data as Application[]
      );
    };

  const totalApplications =
    applications.length;

  const totalInterviews =
    applications.filter(
      (a) =>
        a.status ===
        "Interview"
    ).length;

  const totalOffers =
    applications.filter(
      (a) =>
        a.status === "Offer"
    ).length;

  const totalRejected =
    applications.filter(
      (a) =>
        a.status ===
        "Rejected"
    ).length;

  const chartData = [
    {
      name: "Applied",
      value:
        applications.filter(
          (a) =>
            a.status ===
            "Applied"
        ).length,
    },
    {
      name: "Interview",
      value:
        totalInterviews,
    },
    {
      name: "Offer",
      value:
        totalOffers,
    },
    {
      name: "Rejected",
      value:
        totalRejected,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>
    

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

      <StatusChart
        data={chartData}
      />
    </div>
  );
}