import { useQueries, useQuery } from '@tanstack/react-query'
import React from 'react'
import { quanLyNguoiDungServices } from '../../services'
import { objectToQueryString } from '../../utils'

export const useGetUserList = (maNhom:string) => {
const query = useQuery({
    queryKey:["maNhom",maNhom],
    queryFn:()=>quanLyNguoiDungServices.getListUser(objectToQueryString({'maNhom':maNhom}))
})

  return {
    ...query,
    data:query?.data?.data?.content

  }
}
