import request from "@/utils/request.js"
import Qs from "qs"
export function getBannerImg() {
    return request({
        url: "api-server?c=BannerImg&a=getBannerImg",
        method: "POST",
        data: Qs.stringify({
            
        })
    })
}
