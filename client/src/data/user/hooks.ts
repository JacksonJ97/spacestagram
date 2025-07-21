import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { api, getErrorMessage } from "utils/functions";
import type { User, CreateUserInput } from "data/user/types";

export function useCreateUser() {
  const navigate = useNavigate();

  const createUser = async (user: CreateUserInput) => {
    const data = await api
      .post<User>("/api/users", user)
      .then((response) => response.data);
    return data;
  };

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
