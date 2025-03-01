import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets.js';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg]=useState(false);
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [experience, setExperience]=useState('1 year');
  const [fees, setFees]=useState(0);
  const [about, setAbout]=useState('');
  const [speciality, setSpeciality]=useState('General Physician');
  const [degree, setDegree]=useState('MBBS');
  const [address1, setAddress1]=useState('');
  const [address2, setAddress2]=useState('');

  const {aToken, backend_url}=useContext(AdminContext);

  const onSubmitHandler=async (e)=> {
    e.preventDefault();

    try{
        if(!docImg){
            toast.error("Select Doctor's Image");
        }

        const formData=new FormData();
        formData.append('image', docImg);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('experience', experience);
        formData.append('fees', Number(fees));
        formData.append('about', about);
        formData.append('speciality', speciality);
        formData.append('degree', degree);
        formData.append('address', JSON.stringify({line1: address1, line2: address2}));

        const {data}=await axios.post(`${backend_url}/hms/admin/addDoc`, formData, {
            headers: {
                aToken
            }
        });

        if(data.success){
            toast.success(data.message);
            setDocImg(false);
            setName('');
            setEmail('');
            setPassword('');
            setExperience('1 year');
            setFees(0);
            setAbout('');
            setSpeciality('General Physician');
            setAddress1('');
            setAddress2('');
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

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
        <p className='mb-3 text-2xl font-medium text-primary'>Add Doctor</p>

        <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[84vh] overflow-y-scroll'>
            <div className='flex items-center gap-4 mb-8 text-gray-500'>
                <label htmlFor="doc-img">
                    <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg? URL.createObjectURL(docImg) : assets.upload_area} alt="upload" />
                </label>
                <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id='doc-img' hidden/>
                <p>Upload Doctor<br /> Picture</p>
            </div>

            <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                <div className='w-full lg:flex-1 flex flex-col gap-4'>

                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor Name</p>
                        <input value={name} onChange={(e)=> setName(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Enter name...' required/>
                    </div>

                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor Email</p>
                        <input value={email} onChange={(e)=> setEmail(e.target.value)} className='border rounded px-3 py-2' type="email" placeholder='Enter email...' required/>
                    </div>

                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor Password</p>
                        <input value={password} onChange={(e)=> setPassword(e.target.value)} className='border rounded px-3 py-2' type="password" placeholder='Enter password...' required/>
                    </div>

                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor Experience</p>
                        <select value={experience} onChange={(e)=> setExperience(e.target.value)} className='border rounded px-3 py-2'>
                            <option value="1 year">1 year</option>
                            <option value="2 years">2 years</option>
                            <option value="3 years">3 years</option>
                            <option value="4 years">4 years</option>
                            <option value="5 years">5 years</option>
                            <option value="6 years">6 years</option>
                            <option value="7 years">7 years</option>
                            <option value="8 years">8 years</option>
                        </select>
                    </div>

                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor Fees</p>
                        <input value={fees} onChange={(e)=> setFees(e.target.value)} className='border rounded px-3 py-2' type="number" placeholder='Enter fees...' required/>
                    </div>
                </div>

                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor speciality</p>
                        <select value={speciality} onChange={(e)=> setSpeciality(e.target.value)} className='border rounded px-3 py-2'>
                            <option value="General Physician">General Physician</option>
                            <option value="Gynaecologist">Gynaecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>

                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor Education</p>
                        <input value={degree} onChange={(e)=> setDegree(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Enter education...' required/>
                    </div>

                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor Address</p>
                        <input value={address1} onChange={(e)=> setAddress1(e.target.value)} className='border rounded px-3 py-2 mb-2' type="text" placeholder='Enter address line 1...' required/>
                        <input value={address2} onChange={(e)=> setAddress2(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Enter address line 2...' required/>
                    </div>
                </div>
            </div>

            <div>
                <p className='mt-4 mb-2 text-gray-600'>About Doctor</p>
                <textarea value={about} onChange={(e)=> setAbout(e.target.value)} className='w-full px-4 pt-2 border rounded text-gray-600' type="text" placeholder='Write about doctor...' required rows={5}/>
            </div>

            <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full cursor-pointer'>Add Doctor</button>
        </div>
    </form>
  )
}

export default AddDoctor;