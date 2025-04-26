import { useMutation } from "@tanstack/react-query";
import { signup } from "../utils/authApi";
import toast from "react-hot-toast";

const useSignUp = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await signup(email, password);
    },
    onMutate: () => {
      const toastId = toast.loading("Signing up...");
      return { toastId };
    },
    onSuccess: (data, _, context) => {
      console.log("signup data", data);
      toast.success("Signup successful", { id: context?.toastId });
    },
    onError: (error, _, context) => {
      console.log("signup error", error);
      toast.error(error?.message, {
        id: context?.toastId,
      });
    },
  });
};

export default useSignUp;
