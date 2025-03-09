import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DocProfile = () => {
  const {dToken, profileData, getDocProfile, backend_url, setProfileData}=useContext(DoctorContext);
  const {currencySymbol}=useContext(AppContext);
  const [isEdit, setIsEdit]=useState(false);

  const updateProfile=async ()=> {
    try{
        const updatedData={
            address: profileData.address,
            fees: profileData.fees,
            available: profileData.available
        }

        const {data}=await axios.post(`${backend_url}/hms/doctor/updateProfile`, updatedData, {
            headers: {
                dToken
            }
        });

        if(data.success){
            toast.success(data.message);
            setIsEdit(false);
            getDocProfile();
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

  useEffect(()=> {
    if(dToken){
        getDocProfile();
    }
  }, [dToken]);

  return profileData && (
    <div>
        <div className='flex flex-col gap-4 m-5'>

            <div>
                <img src={profileData.image} alt="" className='bg-[#5F6FFF]/80 w-full sm:max-w-64 rounded-lg'/>
            </div>

            <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
                <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
                <div className='flex items-center gap-2 mt-1 text-gray-600'>
                    <p>{profileData.degree} - {profileData.speciality}</p>
                    <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                </div>

                <div>
                    <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
                    <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
                </div>

                <p className='text-gray-600 font-medium mt-4'>
                    Appointment fee: <span className='text-gray-800'>{currencySymbol} {isEdit ? <input type='number' value={profileData.fees} className="max-w-15 bg-gray-100" onChange={(e)=> setProfileData(prev=> ({...prev, fees: e.target.value}))}/> : profileData.fees}</span>
                </p>

                <div className='flex gap-2 py-2'>
                    <p>Address:</p>
                    <p className='text-sm'>
                        {isEdit ? <input type='text' value={profileData.address.line1} className="max-w-52 bg-gray-100 mb-2" onChange={(e)=> setProfileData(prev=> ({...prev, address: {...prev.address, line1: e.target.value}}))}/> : profileData.address.line1}
                        <br/>
                        {isEdit ? <input type='text' value={profileData.address.line2} className="max-w-52 bg-gray-100" onChange={(e)=> setProfileData(prev=> ({...prev, address: {...prev.address, line2: e.target.value}}))}/> : profileData.address.line2}
                    </p>
                </div>

                <div className='flex gap-1 pt-2'>
                    <input onChange={()=> isEdit && setProfileData(prev=> ({...prev, available: !prev.available}))} checked={profileData.available} type="checkbox" id='avail'/>
                    <label htmlFor="avail">Available</label>
                </div>

                {
                    isEdit
                    ? <button onClick={updateProfile} className='px-4 py-1 border border-gray-500 text-sm rounded-full mt-5 cursor-pointer hover:bg-[#5F6FFF] hover:text-white transition-all'>Save</button>
                    : <button onClick={()=> setIsEdit(true)} className='px-4 py-1 border border-gray-500 text-sm rounded-full mt-5 cursor-pointer hover:bg-[#5F6FFF] hover:text-white transition-all'>Edit</button>
                }
            </div>
        </div>
    </div>
  )
}

export default DocProfile;