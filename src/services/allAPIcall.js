import commonApi from "./commonAPI";
import BaseURL from "./server-url";

//add user
export const addUserAPI = async(user)=>{
   return await commonApi('POST',`${BaseURL}/users`, user)
}

//get user email
export const getUserEmailAPI = async (email)=>{
   return await commonApi('GET', `${BaseURL}/users?email=${email}`)
}

//add events
export const addEventAPI = async (event)=>{
   return await commonApi('POST', `${BaseURL}/events`, event)
}

//get events
export const getEventAPI = async (userId)=>{
   return await commonApi('GET', `${BaseURL}/events?userId=${userId}`)
}

//delete event
export const deleteEventAPI = async (id)=>{
   return await commonApi('DELETE',`${BaseURL}/events/${id}`)
}

//edit event
export const editEventAPI = async (id, event)=>{
   return await commonApi('PUT',`${BaseURL}/events/${id}`, event)
}