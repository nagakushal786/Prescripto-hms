import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext=createContext();

const AdminContextProvider=(props)=> {
    const [aToken, setAToken]=useState(localStorage.getItem("AdminToken") ? localStorage.getItem("AdminToken") : '');
    const backend_url=import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors]=useState([]);
    const [appointments, setAppointments]=useState([]);
    const [dashData, setDashData]=useState(false);

    const getDoctors=async ()=> {
        try{
            const {data}=await axios.get(`${backend_url}/hms/admin/getAllDocs`, {
                headers: {
                    aToken
                }
            });
            
            if(data.success){
                setDoctors(data.doctors);
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

    const changeAvailability=async (docId)=> {
        try{
            const {data}=await axios.post(`${backend_url}/hms/admin/changeAvail`, {docId}, {
                headers: {
                    aToken
                }
            });

            if(data.success){
                toast.success(data.message);
                getDoctors();
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

    const getAllAppointments=async ()=> {
        try{
            const {data}=await axios.get(`${backend_url}/hms/admin/getAppointments`, {
                headers: {
                    aToken
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

    const cancelAppointment=async (appId)=> {
        try{
            const {data}=await axios.post(`${backend_url}/hms/admin/cancelApp`, {appId}, {
                headers: {
                    aToken
                }
            });

            if(data.success){
                toast.success(data.message);
                getAllAppointments();
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
            const {data}=await axios.get(`${backend_url}/hms/admin/dashData`, {
                headers: {
                    aToken
                }
            });

            if(data.success){
                setDashData(data.dashboardData);
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
        aToken,
        setAToken,
        backend_url,
        doctors,
        getDoctors,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;
