import { useForm } from "react-hook-form";
import SavedJobsService from "../../services/savedJobs.service";
import { useAuth } from "../../context/AuthContext";

import type { SavedJob } from "../../types/savedJob.types";

interface Props {
  onSuccess: () => void;
}

export default function SavedJobForm({
  onSuccess,
}: Props) {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<SavedJob>();

  const onSubmit = async (
    data: SavedJob
  ) => {
    if (!user) return;

    await SavedJobsService.saveJob({
      ...data,
      userId: user.uid,
      createdAt:
        new Date().toISOString(),
    });

    reset();

    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="saved-job-form"
    >
      <input
        placeholder="Company"
        {...register("company")}
      />

      <input
        placeholder="Role"
        {...register("role")}
      />

      <input
        placeholder="Location"
        {...register("location")}
      />

      <input
        placeholder="Job URL"
        {...register("jobUrl")}
      />

      <textarea
        placeholder="Notes"
        {...register("notes")}
      />

      <button type="submit">
        Save Job
      </button>
    </form>
  );
}