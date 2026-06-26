import { useEffect } from "react";
import { useForm } from "react-hook-form";

import ApplicationService from "../../services/application.service";
import SavedJobsService from "../../services/savedJobs.service";

import "./ApplicationForm.scss";

import type { Application } from "../../types/application.types";

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
    getValues,
  } = useForm<Application>();

  useEffect(() => {
    if (application) {
      reset(application);
    } else {
      reset({
        company: "",
        role: "",
        location: "",
        jobUrl: "",
        status: "Applied",
        appliedDate: new Date()
          .toISOString()
          .split("T")[0],
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
            location: data.location,
            jobUrl: data.jobUrl,
            status: data.status,
            appliedDate:
              data.appliedDate,
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

  const handleSaveJob = async () => {
    const values = getValues();

    if (
      !values.company ||
      !values.role
    ) {
      alert(
        "Please fill Company and Role first"
      );
      return;
    }

    try {
      await SavedJobsService.saveJob({
        company: values.company,
        role: values.role,
        location:
          values.location || "",
        jobUrl:
          values.jobUrl || "",
        userId,
        createdAt:
          new Date().toISOString(),
      });

      alert(
        "Job Saved Successfully ⭐"
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="application-form"
      >
        <h2 className="form-title">
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
          {...register("jobUrl")}
        />

        <input
          type="date"
          {...register(
            "appliedDate",
            {
              required: true,
            }
          )}
        />

        <input
          placeholder="Location"
          {...register(
            "location"
          )}
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

        <input
          type="date"
          {...register(
            "interviewDate"
          )}
        />

        <div className="form-buttons">
          <button
            type="submit"
            className="btn"
          >
            {application
              ? "Update Application"
              : "Add Application"}
          </button>

          <button
            type="button"
            className="saved-btn btn"
            onClick={
              handleSaveJob
            }
          >
            ⭐ Save Job
          </button>
        </div>
      </form>
    </div>
  );
}