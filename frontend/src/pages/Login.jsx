import { useState } from "react";

const Login = () => {
  const [state, setState]=useState('SignUp');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [name, setName]=useState('');

  const handleSubmit=async (e)=> {
    e.preventDefault();
  }

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-3xl font-semibold text-primary px-20.5">{state==="SignUp" ? "Create Account" : "Login Account"}</p>
        <p className="px-19 font-medium mb-4">{state==="SignUp" ? "Please sign up to book appointment" : "Please login to book appointment"}</p>

        {
          state==="SignUp" && (
            <div className="w-full">
              <p>Full Name</p>
              <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="text" placeholder="Enter your full name..." value={name} onChange={(e)=> setName(e.target.value)}/>
            </div>
          )
        }

        <div className="w-full">
          <p>Email</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="email" placeholder="Enter your email..." value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>

        <div className="w-full">
          <p>Password</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="password" placeholder="Enter your password..." value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </div>

        <button className="bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base mb-1.5">{state==="SignUp" ? "Sign Up" : "Login"}</button>
        {
          state==="SignUp" 
          ? <p onClick={()=> setState("Login")}>Already have an account? <span className="text-primary underline cursor-pointer">Login here</span></p>
          : <p onClick={()=> setState("SignUp")}>New to Prescripto? <span className="text-primary underline cursor-pointer">Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login;