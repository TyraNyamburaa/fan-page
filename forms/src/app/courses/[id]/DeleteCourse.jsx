"use client";

import { useCourse, useDeleteCourse } from "../../../lib/courseHooks";

export default function DeleteCourse({ id }) {
  const { data: course, isLoading } = useCourse(id);
  const deleteCourse = useDeleteCourse(id);

  const handleDelete = async () => {
    const result = await deleteCourse.mutateAsync();

    if (result.error) {
      alert(`Error: ${result.error.message}`);
      return;
    }

    const count = result.meta?.unenrolledStudents ?? 0;

    alert(
      `Course deleted.\nStudents unenrolled: ${count}`
    );

    // TODO: navigate to courses list
    // router.push("/courses");
  };

  if (isLoading) return <p>Loading course...</p>;
  if (!course) return <p className="text-red-600">Course not found.</p>;

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="border p-6 rounded-md shadow-md w-[30rem]">
        <h1 className="text-2xl font-bold mb-4">Delete Course</h1>

        <p className="mb-2">
          <strong>Code:</strong> {course.code}
        </p>
        <p className="mb-2">
          <strong>Title:</strong> {course.title}
        </p>
        <p className="mb-2">
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p className="mb-6">
          <strong>Credits:</strong> {course.credits}
        </p>

        <p className="text-red-600 font-semibold mb-4">
          Are you sure you want to delete this course?
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            disabled={deleteCourse.isPending}
            className="bg-red-600 text-white px-4 py-2 rounded-md font-bold uppercase"
          >
            Delete
          </button>

          <a
            href={`/courses/${id}`}
            className="bg-gray-300 text-black px-4 py-2 rounded-md font-semibold"
          >
            Cancel
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-700">
          <p>Deleting: {deleteCourse.isPending.toString()}</p>
          <p>Error: {Boolean(deleteCourse.error).toString()}</p>
        </div>
      </div>
    </div>
  );
}
