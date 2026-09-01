import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE = "http://localhost:3000/api";

export const useStudents = (params = "") =>
  useQuery({
    queryKey: ["students", params],
    queryFn: async () => {
      const res = await fetch(`${BASE}/students${params}`);
      const json = await res.json();
      return {
        data: json.data,
        meta: json.meta,
      };
    },
  });

export const useStudent = (id) =>
  useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const res = await fetch(`${BASE}/students/${id}?include=courses`);
      const json = await res.json();
      return json.data;
    },
    enabled: !!id,
  });

export const useStudentCourses = (id) =>
  useQuery({
    queryKey: ["student-courses", id],
    queryFn: async () => {
      const res = await fetch(`${BASE}/students/${id}/courses`);
      const json = await res.json();
      return json.data;
    },
    enabled: !!id,
  });

// Update student (PATCH)
export const useUpdateStudent = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values) => {
      const res = await fetch(`${BASE}/students/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["student", id]);
      queryClient.invalidateQueries(["students"]);
    },
  });
};

// Delete a student
export const useDeleteStudent = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE}/students/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
    },
  });
};

// Add a student
export const useAddStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (student) => {
      const res = await fetch(`${BASE}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
    },
  });
};
