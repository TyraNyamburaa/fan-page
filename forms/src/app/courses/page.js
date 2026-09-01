"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddCourse } from "../../lib/courseHooks";

const schema = z.object({
  code: z.string().regex(/^[A-Z]{2,6}\d{2,4}$/, "Invalid course code"),
  title: z.string().min(3, "Title too short"),
  instructor: z.string().min(2, "Instructor name too short"),
  credits: z.number().min(1).max(6),
});

export default function AddCourseForm() {
  const { register, handleSubmit, formState, setError } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const mutation = useAddCourse();

  const onSubmit = async (values) => {
    const result = await mutation.mutateAsync(values);
    if (result.error?.fields) {
      for (const [field, messages] of Object.entries(result.error.fields)) {
        setError(field, { message: messages[0] });
      }
    } else {
      alert("Course created successfully!");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-[30rem]">
        <h1 className="text-2xl">Add Course</h1>

        <label>Code</label>
        <input {...register("code")} className="border rounded-md px-2 py-1" />
        <p className="text-red-600">{formState.errors.code?.message}</p>

        <label>Title</label>
        <input {...register("title")} className="border rounded-md px-2 py-1" />
        <p className="text-red-600">{formState.errors.title?.message}</p>

        <label>Instructor</label>
        <input {...register("instructor")} className="border rounded-md px-2 py-1" />
        <p className="text-red-600">{formState.errors.instructor?.message}</p>

        <label>Credits</label>
        <input
          type="number"
          {...register("credits", { valueAsNumber: true })}
          className="border rounded-md px-2 py-1"
        />
        <p className="text-red-600">{formState.errors.credits?.message}</p>

        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="bg-pink-600 text-white py-2 px-2 font-bold uppercase rounded-full"
        >
          Save
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
