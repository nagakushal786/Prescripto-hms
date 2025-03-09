import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from "../../assets/assets_admin/assets.js";

const AllAppointments = () => {
  const {aToken, appointments, getAllAppointments, cancelAppointment}=useContext(AdminContext);
  const {calculateAge, formattedDate, currencySymbol}=useContext(AppContext);

  useEffect(()=> {
    if(aToken){
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-2xl font-medium text-primary'>All Appointments</p>

      <div className='bg-white border border-white rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3.2fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date and Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {
          appointments.reverse().map((app, idx)=> (
            <div key={idx} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b-gray-200 hover:bg-gray-50'>
              <p className='max-sm:hidden'>{idx+1}</p>
              <div className='flex items-center gap-2'>
                <img src={app.userData.image} alt="" className='w-9 rounded-full'/> <p>{app.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(app.userData.dob)}</p>
              <p>{formattedDate(app.slotDate)} at {app.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img src={app.docData.image} alt="" className='w-9 rounded-full bg-gray-200'/> <p>{app.docData.name}</p>
              </div>
              <p>{currencySymbol}{app.amount}</p>
              {
                app.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : app.isCompleted
                  ? <p className='text-green-400 text-xs font-medium'>Completed</p>
                  : <img onClick={()=> cancelAppointment(app._id)} src={assets.cancel_icon} alt="" className='w-10 cursor-pointer'/>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllAppointments;