import { useMutation, useQuery } from "@tanstack/react-query";
import { sleep } from "../../utils";
import { quanLyDatVe, quanLyRap } from "../../services";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store";
import { quanLyNguoiDungActions } from "../../store/quanLyNguoiDung";

export const useDatVeMutation = () => {
  const dispatch = useAppDispatch();
  const loginMutation = useMutation({
    mutationKey: ["DatVe"],
    mutationFn: async (payload: any) => {
      await sleep(2000);
      return quanLyDatVe.postDanhSachVeDat(payload);
    },
    onSuccess: (data: any) => {
      dispatch(quanLyNguoiDungActions.acceptChoose());
      toast.success(data?.data.content);
    },
    onError: (err: any) => {
      toast.error(err?.response.data.content);
    },
  });
  return loginMutation;
};

export const useGetListHeThong = () => {
  const query = useQuery({
    queryKey: ["heThongRap"],
    queryFn: () => quanLyRap.getHeThongRap(),
  });

  return {
    ...query,
    data:query?.data?.data?.content
  };
};
export const useGetCumRap = (value:string) => {
  const query = useQuery({
    queryKey: ["CumRap",value],
    queryFn: () => quanLyRap.getCumRap(value),
  });

  return {
    ...query,
    data:query?.data?.data?.content
  };
};
