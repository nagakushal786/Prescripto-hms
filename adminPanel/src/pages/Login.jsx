import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext.jsx';
import axios from "axios";
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext.jsx';

const Login = () => {
  const [state, setState]=useState("Admin");
  const {setAToken, backend_url}=useContext(AdminContext);
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const {setDToken}=useContext(DoctorContext);

  const onSubmitHandler=async (e)=> {
    e.preventDefault();

    try{
        if(state==="Admin"){
            const {data}=await axios.post(`${backend_url}/hms/admin/adminLogin`, {email, password});

            if(data.success){
                localStorage.setItem("AdminToken", data.token);
                setAToken(data.token);
            }else{
                toast.error(data.message);
            }
        }else{
            const {data}=await axios.post(`${backend_url}/hms/doctor/docLogin`, {email, password});

            if(data.success){
                localStorage.setItem("DoctorToken", data.token);
                setDToken(data.token);
            }else{
                toast.error(data.message);
            }
        }
    }catch(err){
        if(err.response && err.response.data && err.response.data.message){
            toast.error(err.response.data.message);
        }else{
            toast.error("Something went wrong, please try again!");
        }
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-3xl font-semibold m-auto mb-3'><span className='text-primary'>{state}</span> Login</p>
            <div className='w-full'>
                <p className='font-semibold'>Email</p>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required placeholder='Please enter the email...'/>
            </div>
            <div className='w-full'>
                <p className='font-semibold'>Password</p>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required placeholder='Please enter the password...'/>
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base mb-1 cursor-pointer'>Login</button>

            {
                state=="Admin"
                ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=> setState("Doctor")}>Click here</span></p>
                : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=> setState("Admin")}>Click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login;
