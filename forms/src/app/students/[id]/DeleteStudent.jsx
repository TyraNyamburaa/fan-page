"use client";

import { useStudent } from "../../../lib/studentHooks";
import { useDeleteStudent } from "../../../lib/studentHooks";

export default function DeleteStudent({ id }) {
  const { data: student, isLoading } = useStudent(id);
  const deleteStudent = useDeleteStudent(id);

  const handleDelete = async () => {
    const result = await deleteStudent.mutateAsync();

    if (result.error) {
      alert(`Error: ${result.error.message}`);
      return;
    }

    alert(`Student deleted: ${result.data.firstName} ${result.data.lastName}`);

    // TODO: navigate to students list
    // router.push("/students");
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading student...</p>;
  }

  if (!student) {
    return <p className="text-center mt-10 text-red-600">Student not found.</p>;
  }

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="border p-6 rounded-md shadow-md w-[30rem]">
        <h1 className="text-2xl font-bold mb-4">Delete Student</h1>

        <p className="mb-2">
          <strong>Name:</strong> {student.firstName} {student.lastName}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {student.email}
        </p>
        <p className="mb-6">
          <strong>ID:</strong> {student.id}
        </p>

        <p className="text-red-600 font-semibold mb-4">
          Are you sure you want to delete this student?
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            disabled={deleteStudent.isPending}
            className="bg-red-600 text-white px-4 py-2 rounded-md font-bold uppercase"
          >
            Delete
          </button>

          <a
            href={`/students/${id}`}
            className="bg-gray-300 text-black px-4 py-2 rounded-md font-semibold"
          >
            Cancel
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-700">
          <p>Deleting: {deleteStudent.isPending.toString()}</p>
          <p>Error: {Boolean(deleteStudent.error).toString()}</p>
        </div>
      </div>
    </div>
  );
}
