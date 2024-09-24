import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginSchemaType } from "../../schemas/LoginSchema";
import { sleep } from "../../utils";
import { quanLyNguoiDungServices } from "../../services";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { quanLyNguoiDungActions } from "../../store/quanLyNguoiDung/slice";

export const useLoginMutation = ()=>{
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const loginMutation = useMutation({
        mutationKey:['Login'],
        mutationFn:async(payload:LoginSchemaType)=>{
            await sleep(2000)
            return quanLyNguoiDungServices.dangNhap(payload)
        },
        onSuccess:(data)=>{
            dispatch(quanLyNguoiDungActions.setUser(data?.data.content))
            navigate(-1)
            toast.success(`Chào người dùng ${data?.data.content.hoTen}`)
        },
        onError:(err:any)=>{
            toast.error(err?.response.data.content)
        }
    })
    return loginMutation
}