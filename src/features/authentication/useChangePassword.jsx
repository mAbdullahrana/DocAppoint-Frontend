import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { changePasswordApi } from "../../services/apiAuth";
import { useSelector } from "react-redux";


export const useChangePassword = () => {
  const token = useSelector((state) => state.auth.token);
  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: (data) => changePasswordApi(data, token),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { changePassword, isPending };
};
