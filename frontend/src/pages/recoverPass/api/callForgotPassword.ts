import axios from "axios";
import { ForgotPasswordBody } from "../types/ForgotPasswordRequestBody";
import { api } from "@/axios";



export const callForgotPassword=async(data:ForgotPasswordBody)=>{
    try{
        const response= await api.post("/api/auth/forgot-password",data);
        return response.data;
        
    }catch(error){
        
        if(axios.isAxiosError(error)){
            return{
                success:true,
                message: error.response?.data?.message || 'Un error insesperado en la peticion axios ha ocurrido'
            }
        }
        else{
            return{
                success:false,
                message: 'Un error desconocido ha ocurrido'
            }
        }
        
    }
}

