import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

export const AppContext=createContext();

const AppContextProvider=(props)=> {
    const currencySymbol='₹';
    const backend_url=import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors]=useState([]);
    const [uToken, setUToken]=useState(localStorage.getItem("UserToken") ? localStorage.getItem("UserToken") : false);
    const [userData, setUserData]=useState({
        name: '',
        email: '',
        image: '',
        phone: '',
        gender: '',
        dob: ''
    });

    const getDoctorData=async ()=> {
        try{
            const {data}=await axios.get(`${backend_url}/hms/doctor/docList`);

            if(data.success){
                setDoctors(data.doctors);
            }else{
                toast.error(data.message);
            }
        }catch(err){
            if(err.response && err.response.data && err.response.data.message){
                toast.error(err.response.data.message);
            }else{
                toast.error("Something went wrong, please try later!");
            }
        }
    }

    const loadUserData=async ()=> {
        try{
            const {data}=await axios.get(`${backend_url}/hms/user/getProfile`, {
                headers: {
                    uToken
                }
            });

            if(data.success){
                setUserData(data.user);
            }else{
                toast.error(data.message);
            }
        }catch(err){
            if(err.response && err.response.data && err.response.data.message){
                toast.error(err.response.data.message);
            }else{
                toast.error("Something went wrong, please try later!");
            }
        }
    }

    useEffect(()=> {
        getDoctorData();
    }, []);

    useEffect(()=> {
        if(uToken){
            loadUserData();
        }else{
            setUserData(false);
        }
    }, [uToken]);

    const value={
        doctors,
        currencySymbol,
        uToken,
        setUToken,
        backend_url,
        userData,
        setUserData,
        loadUserData,
        getDoctorData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
