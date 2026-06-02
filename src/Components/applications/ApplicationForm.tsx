import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ApplicationService from "../../services/application.service";
import "./ApplicationForm.scss";

import type {
  Application,
} from "../../types/application.types";

interface Props {
  userId: string;
  application?: Application | null;
  onSuccess: () => void;
}

export default function ApplicationForm({
  userId,
  application,
  onSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Application>();

  useEffect(() => {
    if (application) {
      reset(application);
    } else {
      reset({
        company: "",
        role: "",
        jobUrl: "",
        location: "",
        status: "Applied",
        appliedDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      } as Application);
    }
  }, [application, reset]);

  const onSubmit = async (
    data: Application
  ) => {
    try {
      if (application?.id) {
        await ApplicationService.update(
          application.id,
          {
            company: data.company,
            role: data.role,
            jobUrl: data.jobUrl,
            location: data.location,
            status: data.status,
            appliedDate: data.appliedDate,
          }
        );
      } else {
        await ApplicationService.create({
          ...data,
          userId,
          createdAt:
            new Date().toISOString(),
        });
      }

      reset();

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="application-form"
    >
      <h2>
        {application
          ? "Edit Application"
          : "Add Application"}
      </h2>

      <input
        placeholder="Company"
        {...register("company", {
          required: true,
        })}
      />

      <input
        placeholder="Role"
        {...register("role", {
          required: true,
        })}
      />

      <input
        placeholder="Job URL"
        {...register("jobUrl", {
          required: true,
        })}
      />

        <input
        type="date"
        {...register("appliedDate", { required: true })}
        />
      <input
        placeholder="Location"
        {...register("location", {
          required: true,
        })}
      />

      <select
        {...register("status")}
      >
        <option value="Wishlist">
          Wishlist
        </option>

        <option value="Applied">
          Applied
        </option>

        <option value="Interview">
          Interview
        </option>

        <option value="Assessment">
          Assessment
        </option>

        <option value="Offer">
          Offer
        </option>

        <option value="Rejected">
          Rejected
        </option>
      </select>

      <button type="submit">
        {application
          ? "Update Application"
          : "Add Application"}
      </button>
    </form>
  );
}