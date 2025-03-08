import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const {aToken, dashData, getDashData, cancelAppointment}=useContext(AdminContext);
  const {formattedDate}=useContext(AppContext);

  useEffect(()=> {
    if(aToken){
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-10'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400 text-sm'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400 text-sm'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400 text-sm'>Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-300'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Appointments</p>
        </div>

        {
          dashData.latestAppointments.map((app, idx)=> (
            <div key={idx} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_5fr_4fr_4fr_1fr] items-center text-gray-500 py-3 px-6 border-b-gray-200 hover:bg-gray-50 text-sm'>
              <p className='max-sm:hidden'>{idx+1}</p>
              <div className='flex items-center gap-2'>
                <img src={app.userData.image} alt="" className='w-8 rounded-full'/> <p>{app.userData.name}</p>
              </div>
              <p>{formattedDate(app.slotDate)} at {app.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img src={app.docData.image} alt="" className='w-9 rounded-full bg-gray-200'/> <p>{app.docData.name}</p>
              </div>
              {
                app.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : <img onClick={()=> cancelAppointment(app._id)} src={assets.cancel_icon} alt="" className='w-10 cursor-pointer'/>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard;