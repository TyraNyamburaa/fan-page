"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddStudent } from "../lib/apihook";

const schema = z.object({
  firstName: z.string().min(2, "First name too short"),
  lastName: z.string().min(2, "Last name too short"),
  email: z.string().email("Invalid email"),
});

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, formState, setError } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const mutation = useAddStudent();

  const onSubmit = async (values) => {
    const result = await mutation.mutateAsync(values);
    if (result.error?.fields) {
      for (const [field, messages] of Object.entries(result.error.fields)) {
        setError(field, { message: messages[0] });
      }
    } else {
      alert("Student created successfully!");
      router.push("/students");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-[30rem]">
        <h1 className="text-2xl">Student Registration</h1>

        <label>First Name</label>
        <input {...register("firstName")} className="border rounded-md px-2 py-1" />
        <p className="text-red-600">{formState.errors.firstName?.message}</p>

        <label>Last Name</label>
        <input {...register("lastName")} className="border rounded-md px-2 py-1" />
        <p className="text-red-600">{formState.errors.lastName?.message}</p>

        <label>Email</label>
        <input {...register("email")} className="border rounded-md px-2 py-1" />
        <p className="text-red-600">{formState.errors.email?.message}</p>

        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="bg-pink-600 text-white py-2 px-2 font-bold uppercase rounded-full"
        >
          Save
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-700">
        <p>Valid: {formState.isValid.toString()}</p>
        <p>Dirty: {formState.isDirty.toString()}</p>
        <p>Submitting: {formState.isSubmitting.toString()}</p>
        <p>Validating: {formState.isValidating.toString()}</p>
      </div>
    </div>
  );
}
