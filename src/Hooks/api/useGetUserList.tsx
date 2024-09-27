import { useQuery } from '@tanstack/react-query'
import { quanLyNguoiDungServices } from '../../services'

export const useGetUserList = (value:any) => {
const query = useQuery({
    queryKey:["maNhom",value],
    queryFn:()=>quanLyNguoiDungServices.getListUser(value)
})

  return {
    ...query,
    data:query?.data?.data?.content

  }
}
