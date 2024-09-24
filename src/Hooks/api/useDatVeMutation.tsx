import { useMutation } from "@tanstack/react-query";
import { sleep } from "../../utils";
import { quanLyDatVe } from "../../services";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store";
import { quanLyNguoiDungActions } from "../../store/quanLyNguoiDung";

export const useDatVeMutation = ()=>{
    const dispatch = useAppDispatch()
    const loginMutation = useMutation({
        mutationKey:['DatVe'],
        mutationFn:async(payload:any)=>{
            await sleep(2000)
            return quanLyDatVe.postDanhSachVeDat(payload)
        },
        onSuccess:(data:any)=>{
            dispatch(quanLyNguoiDungActions.acceptChoose())
            toast.success(data?.data.content)
        },
        onError:(err:any)=>{
            console.log('124')
            toast.error(err?.response.data.content)
        }
    })
    return loginMutation
}