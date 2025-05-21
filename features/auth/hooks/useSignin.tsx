import { useMutation } from "@tanstack/react-query";
import { signin } from "../utils/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/utils/routes";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/userSlice";
import { jwtDecode } from "jwt-decode";

const useSignin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      return await signin(username, password);
    },
    onMutate: () => {
      const toastId = toast.loading("Signing in...");
      return { toastId };
    },
    onSuccess: async (data, _, context) => {
      toast.success("Signin successful", { id: context?.toastId });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      const decodedAccessToken = jwtDecode<{ sub: string; exp: number }>(
        data.access_token
      );

      dispatch(
        loginUser({
          email: decodedAccessToken?.sub,
          id: decodedAccessToken?.sub,
          expiresAt: decodedAccessToken?.exp,
          isAuthenticated: true,
        })
      );
      router.push(routes.chats);
    },
    onError: (error, _, context) => {
      toast.error(error?.message || "Failed to signin", {
        id: context?.toastId,
      });
    },
  });
};

export default useSignin;
