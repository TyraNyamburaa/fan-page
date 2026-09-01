"use client";

import { useState } from "react";
import { useStudents } from "../../lib/studentHooks";

export default function StudentsList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const params = `?page=${page}&limit=10${search ? `&search=${search}` : ""}`;

  const { data, isLoading } = useStudents(params);

  if (isLoading) {
    return <p className="text-center mt-10">Loading students...</p>;
  }

  const students = data?.data ?? [];
  const meta = data?.meta ?? {};

  return (
    <div className="p-10 max-w-3xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Students</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border rounded-md px-3 py-2"
      />

      {/* List */}
      <ul className="space-y-3">
        {students.map((s) => (
          <li key={s.id} className="border p-4 rounded-md shadow-sm">
            <p className="font-semibold text-lg">
              {s.firstName} {s.lastName}
            </p>
            <p className="text-gray-700">{s.email}</p>

            <a
              href={`/students/${s.id}`}
              className="text-blue-600 underline mt-2 inline-block"
            >
              View Details
            </a>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex gap-4 mt-6">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={page >= meta.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <p className="text-sm text-gray-600">
        Page {meta.page} of {meta.totalPages}
      </p>
    </div>
  );
}
