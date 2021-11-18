import request from "@/utils/request.js"
import Qs from "qs"
export function get_all_hospital() {
    return request({
        url: "api-server?c=Hospital&a=get_all_hospital",
        method: "POST",
        data: Qs.stringify({
            
        })
    })
}

export function add_hospital(data){
    return request({
        url: "api-server?c=Hospital&a=add_hospital",
        method: "POST",
        data: Qs.stringify({
            ...data
        })
    })
}