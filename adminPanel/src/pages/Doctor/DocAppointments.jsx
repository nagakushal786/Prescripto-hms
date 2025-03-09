import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

const DocAppointments = () => {
  const {dToken, appointments, docAppointments, completeAppointment, cancelAppointment}=useContext(DoctorContext);
  const {calculateAge, formattedDate, currencySymbol}=useContext(AppContext);

  useEffect(()=> {
    if(dToken){
        docAppointments();
    }
  }, [dToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-2xl font-medium text-primary'>All Appointments</p>

        <div className='bg-white border border-white rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
            <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
                <p>#</p>
                <p>Patient</p>
                <p>Payment</p>
                <p>Age</p>
                <p>Date and Time</p>
                <p>Fees</p>
                <p>Actions</p>
            </div>

            {
                appointments.reverse().map((app, idx)=> (
                    <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b-gray-200 hover:bg-gray-50' key={idx}>
                        <p className='max-sm:hidden'>{idx+1}</p>
                        <div className='flex items-center gap-2'>
                            <img src={app.userData.image} alt="" className='w-8 rounded-full'/> <p>{app.userData.name}</p>
                        </div>
                        <div>
                            <p className='text-xs text-primary inline border border-[#5F6FFF] px-2 py-1 rounded-full'>
                                {app.payment ? 'Online' : 'Cash'}
                            </p>
                        </div>
                        <p className='max-sm:hidden'>{calculateAge(app.userData.dob)}</p>
                        <p>{formattedDate(app.slotDate)} at {app.slotTime}</p>
                        <p>{currencySymbol}{app.amount}</p>
                        {
                            app.cancelled
                            ? <p className='text-red-400 text-xs font-semibold'>Cancelled</p>
                            : app.isCompleted
                              ? <p className='text-green-400 text-xs font-semibold'>Completed</p>
                              : <div className='flex'>
                                   <img onClick={()=> cancelAppointment(app._id)} src={assets.cancel_icon} alt="" className='w-10 cursor-pointer'/>
                                   <img onClick={()=> completeAppointment(app._id)} src={assets.tick_icon} alt="" className='w-10 cursor-pointer'/>
                                </div>
                        }
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default DocAppointments;