import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "utils/functions";
import type { Credentials } from "data/auth/types";
import { currentUserOptions } from "data/user/hooks";

export function useUserLogin() {
  const navigate = useNavigate();
  const client = useQueryClient();

  const loginUser = async (credentials: Credentials) => {
    const data = await api
      .post<{ message: string }>("/api/auth/login", credentials)
      .then((response) => response.data);
    return data;
  };

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/", { replace: true });
      client.invalidateQueries({ queryKey: currentUserOptions.queryKey });
    },
  });
}
