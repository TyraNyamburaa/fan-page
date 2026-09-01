"use client";

import { useStudent } from "../../../lib/studentHooks";
import { useStudentCourses } from "../../../lib/studentHooks";

export default function StudentDetails({ id }) {
  const { data: student, isLoading: loadingStudent } = useStudent(id);
  const { data: courses, isLoading: loadingCourses } = useStudentCourses(id);

  if (loadingStudent || loadingCourses) {
    return <p className="text-center mt-10">Loading student details...</p>;
  }

  if (!student) {
    return <p className="text-center mt-10 text-red-600">Student not found.</p>;
  }

  return (
    <div className="p-10 max-w-3xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-bold">
        {student.firstName} {student.lastName}
      </h1>

      <div className="border rounded-md p-4 shadow-sm">
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Created:</strong> {new Date(student.createdAt).toLocaleString()}</p>
        <p><strong>Updated:</strong> {new Date(student.updatedAt).toLocaleString()}</p>
      </div>

      <h2 className="text-2xl font-semibold mt-6">Enrolled Courses</h2>

      {courses.length === 0 ? (
        <p className="text-gray-600">This student is not enrolled in any courses.</p>
      ) : (
        <ul className="space-y-3">
          {courses.map((c) => (
            <li key={c.id} className="border p-3 rounded-md">
              <p className="font-semibold">{c.code} — {c.title}</p>
              <p className="text-sm text-gray-700">Instructor: {c.instructor}</p>
              <p className="text-sm text-gray-700">Credits: {c.credits}</p>

              <a
                href={`/students/${id}/unenrol?courseId=${c.id}`}
                className="text-red-600 underline mt-2 inline-block"
              >
                Unenrol
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex gap-4">
        <a
          href={`/students/${id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Edit Student
        </a>

        <a
          href={`/students/${id}/delete`}
          className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Delete Student
        </a>

        <a
          href={`/students/${id}/enrol`}
          className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Enrol in Course
        </a>
      </div>
    </div>
  );
}
