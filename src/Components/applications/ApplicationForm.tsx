import { useForm } from "react-hook-form";

import ApplicationService from "../../services/application.service";

import type { Application } from "../../types/application.types";

interface Props {
  userId: string;
  onSuccess: () => void;
}

export default function ApplicationForm({
  userId,
  onSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Application>();

  const onSubmit = async (
    data: Application
  ) => {
    await ApplicationService.create({
      ...data,

      userId,

      createdAt:
        new Date().toISOString(),
    });

    reset();

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        placeholder="Company"
        {...register("company")}
      />

      <input
        placeholder="Role"
        {...register("role")}
      />

        <input
        placeholder="URL"
        {...register("jobUrl")}
      />
      <input
        placeholder="Location"
        {...register("location")}
      />

      <input
        type="date"
        {...register("appliedDate")}
      />

      <select
        {...register("status")}
      >
        <option value="Applied">
          Applied
        </option>

        <option value="Interview">
          Interview
        </option>

        <option value="Offer">
          Offer
        </option>

        <option value="Rejected">
          Rejected
        </option>
      </select>

      <button type="submit">
        Add Application
      </button>

    </form>
  );
}