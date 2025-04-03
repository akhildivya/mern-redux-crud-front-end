import { BASEURL } from "./baseurl";
import { commonApi } from "./commonstructure";
export const getallUsers=async()=>{
    return await commonApi('GET',`${BASEURL}/user/viewdetails`,{})
}

export const addUsers=async(body)=>{
    return await commonApi('POST',`${BASEURL}/user/adduser`,body)
}
export const editUser = async (body,_id) => {
    return await commonApi('PUT', `${BASEURL}/user/edituser/${_id}`,body)
}
export const removeUser=async(id)=>{
    return await commonApi('DELETE',`${BASEURL}/user/delete/${id}`)
}