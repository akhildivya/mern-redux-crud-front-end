import axios from "axios"
export const commonApi=async(method,url,body)=>{
    const config={
        method,
        url,
        data:body
    }
    return await axios(config).then(response=>{
        return response
    }).catch(response=>{
        return response
    })
}