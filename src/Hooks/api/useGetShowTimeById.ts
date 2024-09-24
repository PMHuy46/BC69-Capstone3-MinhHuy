import { useQuery } from "@tanstack/react-query"
import { quanLyRap } from "../../services"
import { objectToQueryString } from "../../utils"

type UseGetShowTimeById = {
    id: string
}

export const useGetShowTimeById = ({ id }: UseGetShowTimeById) => {

    const query = useQuery({
        queryKey: ['ShowTime', id],
        queryFn: () => quanLyRap.getShowTimeById(objectToQueryString({ maPhim: id }))
    })

    return{
        ...query,
        data:query?.data?.data?.content
    }
}
