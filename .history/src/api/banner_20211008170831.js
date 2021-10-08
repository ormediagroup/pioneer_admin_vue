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

 export function set_banner_img(banner_page,banner_img){
    return request({
        url: "api-server?c=BannerImg&a=setBannerImg",
        method: "POST",
        data: Qs.stringify({
            banner_page,banner_img
        })
    })
 }