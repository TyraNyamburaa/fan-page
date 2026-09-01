"use client";

import { useCourse, useCourseStudents } from "../../../lib/courseHooks";

export default function CourseDetails({ id }) {
  const { data: course, isLoading: loadingCourse } = useCourse(id);
  const { data: students, isLoading: loadingStudents } = useCourseStudents(id);

  if (loadingCourse || loadingStudents) {
    return <p className="text-center mt-10">Loading course details...</p>;
  }

  if (!course) {
    return <p className="text-center mt-10 text-red-600">Course not found.</p>;
  }

  return (
    <div className="p-10 flex flex-col gap-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{course.code} — {course.title}</h1>

      <div className="border rounded-md p-4 shadow-sm">
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Credits:</strong> {course.credits}</p>
        <p><strong>Created:</strong> {new Date(course.createdAt).toLocaleString()}</p>
        <p><strong>Updated:</strong> {new Date(course.updatedAt).toLocaleString()}</p>
      </div>

      <h2 className="text-2xl font-semibold mt-6">Enrolled Students</h2>

      {students.length === 0 ? (
        <p className="text-gray-600">No students enrolled in this course.</p>
      ) : (
        <ul className="space-y-3">
          {students.map((s) => (
            <li key={s.id} className="border p-3 rounded-md">
              <p className="font-semibold">{s.firstName} {s.lastName}</p>
              <p className="text-sm text-gray-700">{s.email}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex gap-4">
        <a
          href={`/courses/${id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Edit Course
        </a>

        <a
          href={`/courses/${id}/delete`}
          className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Delete Course
        </a>

        <a
          href={`/courses/${id}/enrol`}
          className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Enrol Student
        </a>
      </div>
    </div>
  );
}
