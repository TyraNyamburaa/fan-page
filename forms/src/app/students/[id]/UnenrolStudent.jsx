"use client";

import { useForm } from "react-hook-form";
import { useStudentCourses } from "../../../lib/studentHooks";
import { useUnenrolStudent } from "../../../lib/courseHooks";

export default function UnenrolStudent({ id }) {
  const { data: courses, isLoading } = useStudentCourses(id);
  const unenrolMutation = useUnenrolStudent(id);

  const {
    register,
    handleSubmit,
    formState,
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (values) => {
    const result = await unenrolMutation.mutateAsync({
      courseId: Number(values.courseId),
    });

    if (result.error?.fields) {
      for (const [field, messages] of Object.entries(result.error.fields)) {
        setError(field, { message: messages[0] });
      }
      return;
    }

    alert("Student unenrolled successfully!");
  };

  if (isLoading) return <p>Loading enrolled courses...</p>;

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-[30rem]">
        <h1 className="text-2xl">Unenrol Student from Course</h1>

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
          className="bg-red-600 text-white py-2 px-2 font-bold uppercase rounded-full"
        >
          Unenrol
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
