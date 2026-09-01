import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE = "http://localhost:3000/api";

// Fetch all courses
export const useCourses = (params = "") =>
  useQuery({
    queryKey: ["courses", params],
    queryFn: async () => {
      const res = await fetch(`${BASE}/courses${params}`);
      const json = await res.json();
      return json.data;
    },
  });

// Add a course
export const useAddCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (course) => {
      const res = await fetch(`${BASE}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries(["courses"]),
  });
};

// Fetch one course
export const useCourse = (id) =>
  useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await fetch(`${BASE}/courses/${id}`);
      const json = await res.json();
      return json.data;
    },
    enabled: !!id,
  });

// Update course (PATCH)
export const useUpdateCourse = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values) => {
      const res = await fetch(`${BASE}/courses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["course", id]);
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

// Everyone taking one course
export const useCourseStudents = (id) =>
  useQuery({
    queryKey: ["course-students", id],
    queryFn: async () => {
      const res = await fetch(`${BASE}/courses/${id}/students`);
      const json = await res.json();
      return json.data;
    },
    enabled: !!id,
  });

// Delete a course
export const useDeleteCourse = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE}/courses/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

// Enrol student in a course
export const useEnrolStudent = (studentId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseId }) => {
      const res = await fetch(`${BASE}/students/${studentId}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["student", studentId]);
      queryClient.invalidateQueries(["students"]);
    },
  });
};

// Unenrol student from a course
export const useUnenrolStudent = (studentId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseId }) => {
      const res = await fetch(`${BASE}/students/${studentId}/courses/${courseId}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["student", studentId]);
      queryClient.invalidateQueries(["students"]);
    },
  });
};
