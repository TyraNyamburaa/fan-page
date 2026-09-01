"use client";

import { useForm } from "react-hook-form";
import { useCourses } from "../../../lib/courseHooks";
import { useEnrolStudent } from "../../../lib/courseHooks";

export default function EnrolStudentInCourse({ id }) {
  const { data: courses, isLoading } = useCourses();
  const enrolMutation = useEnrolStudent(id);

  const {
    register,
    handleSubmit,
    formState,
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (values) => {
    const result = await enrolMutation.mutateAsync({
      courseId: Number(values.courseId),
    });

    if (result.error?.fields) {
      for (const [field, messages] of Object.entries(result.error.fields)) {
        setError(field, { message: messages[0] });
      }
      return;
    }

    if (result.error?.code === "CONFLICT") {
      setError("courseId", { message: result.error.message });
      return;
    }

    alert("Student enrolled successfully!");
  };

  if (isLoading) return <p>Loading courses...</p>;

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-[30rem]">
        <h1 className="text-2xl">Enrol Student in Course</h1>

        <label>Select Course</label>
        <select
          {...register("courseId", { required: "Course is required" })}
          className="border rounded-md px-2 py-1"
        >
          <option value="">-- choose course --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} — {c.title}
            </option>
          ))}
        </select>
        <p className="text-red-600">{formState.errors.courseId?.message}</p>

        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="bg-green-600 text-white py-2 px-2 font-bold uppercase rounded-full"
        >
          Enrol
        </button>

        <div className="mt-4 text-sm text-gray-700">
          <p>Valid: {formState.isValid.toString()}</p>
          <p>Dirty: {formState.isDirty.toString()}</p>
          <p>Submitting: {formState.isSubmitting.toString()}</p>
          <p>Validating: {formState.isValidating.toString()}</p>
        </div>
      </form>
    </div>
  );
}
