import React, { useContext } from 'react'
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DocDashboard from './pages/Doctor/DocDashboard';
import DocAppointments from './pages/Doctor/DocAppointments';
import DocProfile from './pages/Doctor/DocProfile';

const App = () => {
  const {aToken}=useContext(AdminContext);
  const {dToken}=useContext(DoctorContext);

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <NavBar/>
      <div className='flex items-start'>
        <SideBar/>
        <Routes>
          {/* Admin Routes */}
          {aToken && <Route path='/' element={<Dashboard/>}/>}
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/doctor-list' element={<DoctorsList/>}/>

          {/* Doctor Routes */}
          <Route path='/' element={<DocDashboard/>}/>
          <Route path='/doc-dashboard' element={<DocDashboard/>}/>
          <Route path='/doc-appointments' element={<DocAppointments/>}/>
          <Route path='/doc-profile' element={<DocProfile/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App;
