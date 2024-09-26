import { Query, useQueries, useQuery } from '@tanstack/react-query'
import React from 'react'
import { quanLyNguoiDungServices } from '../../services'
import { objectToQueryString } from '../../utils'

export const useGetUserList = (value:"") => {
const query = useQuery({
    queryKey:["maNhom",value],
    queryFn:()=>quanLyNguoiDungServices.getListUser(value)
})

  return {
    ...query,
    data:query?.data?.data?.content

  }
}
