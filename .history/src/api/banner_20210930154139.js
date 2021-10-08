import request from "@/utils/request.js"
import Qs from "qs"
export function get_banner_img() {
    return request({
        url: "api/api-server?c=BannerImg&a=getBannerImg",
        method: "POST",
        data: Qs.stringify({
            
        })
    })
}
