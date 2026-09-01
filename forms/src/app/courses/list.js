"use client";
import { useCourses } from "../../lib/courseHooks";

export default function CoursesList() {
  const { data: courses, isLoading } = useCourses();

  if (isLoading) return <p>Loading courses...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li key={course.id} className="border p-2 rounded-md">
            <p className="font-semibold">{course.code} — {course.title}</p>
            <p>Instructor: {course.instructor}</p>
            <p>Credits: {course.credits}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
