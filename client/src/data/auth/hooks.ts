import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "config/api";
import type { Credentials } from "data/auth/types";
import { getErrorMessage } from "utils/functions";
import { currentUserOptions } from "data/user/hooks";

export function useUserLogin() {
  const navigate = useNavigate();
  const client = useQueryClient();

  const loginUser = async (credentials: Credentials) => {
    const data = await api
      .post<{ message: string }>("/api/auth/login", { json: credentials })
      .json();
    return data;
  };

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: currentUserOptions.queryKey });
      navigate("/", { replace: true });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}

export function useUserLogout() {
  const navigate = useNavigate();
  const client = useQueryClient();

  const logoutUser = async () => {
    const data = await api.post<{ message: string }>("/api/auth/logout").json();
    return data;
  };

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      client.resetQueries({ queryKey: currentUserOptions.queryKey });
      navigate("/login", { replace: true });
    },
  });
}
