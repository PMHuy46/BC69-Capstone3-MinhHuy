import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { RegisterSchemaType } from "../../schemas/RegisterSchema";
import { sleep } from "../../utils";
import { quanLyNguoiDungServices } from "../../services";
import { toast } from "react-toastify";
import { PATH } from "../../constants";

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationKey: ["Register"],
    mutationFn: async (payload: RegisterSchemaType) => {
      await sleep(2000);
      return quanLyNguoiDungServices.dangKy(payload);
    },
    onSuccess: () => {
      toast.success("thành công");

      navigate(PATH.login);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.content);
    },
  });
  return registerMutation;
};
