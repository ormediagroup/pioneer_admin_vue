import request from "@/utils/request.js"
import Qs from "qs"
export function get_banner_img() {
    return request({
        url: "api-server?c=BannerImg&a=getBannerImg",
        method: "POST",
        data: Qs.stringify({
            
        })
    })
}
 export function get_all_img(){
     return request({
         url:'api-server?c=BannerImg&a=getAllImg',
         method:'POST',
         data:Qs.stringify({})
     })
 }