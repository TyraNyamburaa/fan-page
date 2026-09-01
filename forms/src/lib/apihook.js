import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE = "http://localhost:3000/api";

// Students
export const useStudents = (params = "") =>
  useQuery({
    queryKey: ["students", params],
    queryFn: async () => {
      const res = await fetch(`${BASE}/students${params}`);
      const json = await res.json();
      return json.data;
    },
  });

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
    onSuccess: () => queryClient.invalidateQueries(["students"]),
  });
};
