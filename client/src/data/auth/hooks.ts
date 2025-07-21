import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { api } from "utils/functions";
import type { UserLoginResponse, Credentials } from "data/auth/types";

export function useUserLogin() {
  const navigate = useNavigate();

  const loginUser = async (credentials: Credentials) => {
    const data = await api
      .post<UserLoginResponse>("/api/auth/login", credentials)
      .then((response) => response.data);
    return data;
  };

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });
}
