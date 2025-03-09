import { useContext, useEffect, useState } from "react";
import {AppContext} from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const {backend_url, uToken, getDoctorData}=useContext(AppContext);
  const [appointments, setAppointments]=useState([]);
  const months=["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const navigate=useNavigate();

  const slotDateFormat=(slotDate)=> {
    const dateArray=slotDate.split("-");
    return `${dateArray[0]} ${months[Number(dateArray[1])]}, ${dateArray[2]}`;
  }

  const getUserAppointments=async ()=> {
    try{
      const {data}=await axios.get(`${backend_url}/hms/user/getAppointments`, {
        headers: {
          uToken
        }
      });
  
      if(data.success){
        setAppointments(data.appointments.reverse());
        console.log(data.appointments.reverse());
      }
    }catch(err){
      toast.error(err.message || err);
    }
  }

  const cancelAppointment=async (appId)=> {
    try{
      const {data}=await axios.post(`${backend_url}/hms/user/cancelAppointment`, {appId}, {
        headers: {
          uToken
        }
      });

      if(data.success){
        toast.success(data.message);
        getUserAppointments();
        getDoctorData();
      }else{
        toast.error(data.message);
      }
    }catch(err){
      toast.error(err.message || err);
    }
  }

  const initPay=(order)=> {
    const options={
      key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response)=> {
        try{
          const {data}=await axios.post(`${backend_url}/hms/user/verifyRazorpay`, response, {
            headers: {
              uToken
            }
          });

          if(data.success){
            getUserAppointments();
            navigate("/my-appointments");
          }
        }catch(err){
          toast.error(err.message || err);
        }
      }
    }

    const rzp=new window.Razorpay(options);
    rzp.open();
  }

  const appRazorpay=async (appId)=> {
    try{
      const {data}=await axios.post(`${backend_url}/hms/user/payRazorpay`, {appId}, {
        headers: {
          uToken
        }
      });

      if(data.success){
        initPay(data.order);
      }
    }catch(err){
      toast.error(err.message || err);
    }
  }

  useEffect(()=> {
    if(uToken){
      getUserAppointments();
    }
  }, [uToken]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div className="mt-2">
        {
          appointments.reverse().map((user, idx)=> (
            <div key={idx} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-b-zinc-400 mb-1">
              <div>
                <img className="w-36 bg-indigo-50" src={user.docData.image} alt="user" />
              </div>

              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{user.docData.name}</p>
                <p>{user.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address: </p>
                <p className="text-xs">{user.docData.address.line1}</p>
                <p className="text-xs">{user.docData.address.line2}</p>
                <p className="text-xs mt-1"><span className="text-xs text-neutral-700 font-medium">Date and Time: </span> {slotDateFormat(user.slotDate)} | {user.slotTime}</p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                {!user.cancelled && user.payment && !user.isCompleted && <button className="sm:min-w-48 py-1 border border-green-500 rounded text-green-500">Paid</button>}
                {!user.cancelled && !user.payment && !user.isCompleted && <button onClick={()=> appRazorpay(user._id)} className="text-xs font-semibold text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 cursor-pointer">Pay Online</button>}
                {!user.cancelled && !user.isCompleted && <button onClick={()=> cancelAppointment(user._id)} className="text-xs font-semibold text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer">Cancel Appointment</button>}
                {user.cancelled && !user.isCompleted && <button className="sm:min-w-48 py-1 border border-red-500 rounded text-red-500">Appointment cancelled</button>}
                {user.isCompleted && <button className="sm:min-w-48 py-1 border border-green-500 rounded text-green-500">Completed</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments;