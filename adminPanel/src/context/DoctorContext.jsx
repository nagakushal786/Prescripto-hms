import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext=createContext();

const DoctorContextProvider=(props)=> {
    const backend_url=import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken]=useState(localStorage.getItem("DoctorToken") ? localStorage.getItem("DoctorToken") : '');
    const [appointments, setAppointments]=useState([]);
    const [dashData, setDashData]=useState(false);
    const [profileData, setProfileData]=useState(false);

    const docAppointments=async ()=> {
        try{
            const {data}=await axios.get(`${backend_url}/hms/doctor/docAppointments`, {
                headers: {
                    dToken
                }
            });

            if(data.success){
                setAppointments(data.appointments);
            }else{
                toast.error(data.message);
            }
        }catch(err){
            if(err.response && err.response.data && err.response.data.message){
                toast.error(err.response.data.message);
            }else{
                toast.error("Something went wrong, try again later!");
            }    
        }
    }

    const completeAppointment=async (appId)=> {
        try{
            const {data}=await axios.post(`${backend_url}/hms/doctor/completeApp`, {appId}, {
                headers: {
                    dToken
                }
            });

            if(data.success){
                toast.success(data.message);
                docAppointments();
            }else{
                toast.error(data.message);
            }
        }catch(err){
            if(err.response && err.response.data && err.response.data.message){
                toast.error(err.response.data.message);
            }else{
                toast.error("Something went wrong, try again later!");
            }    
        }
    }

    const cancelAppointment=async (appId)=> {
        try{
            const {data}=await axios.post(`${backend_url}/hms/doctor/cancelApp`, {appId}, {
                headers: {
                    dToken
                }
            });

            if(data.success){
                toast.success(data.message);
                docAppointments();
            }else{
                toast.error(data.message);
            }
        }catch(err){
            if(err.response && err.response.data && err.response.data.message){
                toast.error(err.response.data.message);
            }else{
                toast.error("Something went wrong, try again later!");
            }    
        }
    }

    const getDashData=async ()=> {
        try{
            const {data}=await axios.get(`${backend_url}/hms/doctor/docDashboard`, {
                headers: {
                    dToken
                }
            });

            if(data.success){
                setDashData(data.dashData);
            }else{
                toast.error(data.message);
            }
        }catch(err){
            if(err.response && err.response.data && err.response.data.message){
                toast.error(err.response.data.message);
            }else{
                toast.error("Something went wrong, try again later!");
            }    
        }
    }

    const getDocProfile=async ()=> {
        try{
            const {data}=await axios.get(`${backend_url}/hms/doctor/getProfile`, {
                headers: {
                    dToken
                }
            });

            if(data.success){
                setProfileData(data.profileData);
                console.log(data.profileData);
            }else{
                toast.error(data.message);
            }
        }catch(err){
            if(err.response && err.response.data && err.response.data.message){
                toast.error(err.response.data.message);
            }else{
                toast.error("Something went wrong, try again later!");
            }    
        }
    }

    const value={
        dToken,
        setDToken,
        backend_url,
        appointments,
        setAppointments,
        docAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,
        setDashData,
        getDashData,
        profileData,
        setProfileData,
        getDocProfile
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;