import { stringify } from "qs"

type objectToQueryStringParams = Record<string, unknown>

export const objectToQueryString = (obj: objectToQueryStringParams) => {
    return stringify(obj,{
            addQueryPrefix:true
    })
}


/**
 * tạo 1 đoạn mã query 
 * @param obj :object
 * @returns query string
 */