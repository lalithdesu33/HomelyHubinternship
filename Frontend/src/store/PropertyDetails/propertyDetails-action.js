import {propertyDetailsAction} from "./propertyDetails-slice";
import {axiosInstance} from "../../utils/axios"

//fetch details using its id

// recv property Id
// start loading
// call backend api
// wait for response 
// get proprty dtata 
// store details in redux 

export const getPropertyDetails =(id) => async(dispatch) =>{
    try{
        dispatch(propertyDetailsAction.getListRequest());
        const response = await axiosInstance(`/v1/rent/listing/${id}`)
        
        console.log(response);
        if(!response){
            throw new Error ("could not fetch any property");
        }
        const{data} = response.data;
        dispatch(propertyDetailsAction.getPropertyDetails(data))
    }catch(error){
        dispatch(propertyDetailsAction.getErrors(error.response.data.error))
    }
}