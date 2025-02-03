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
        <p>{state==="SignUp" ? "Create Account" : "Login to your Account"}</p>
        <p>{state==="SignUp" ? "Please sign up to book appointment" : "Please login to book appointment"}</p>

        <div>
          <p>Full Name</p>
          <input type="text" placeholder="Enter your full name..." value={name} onChange={(e)=> setName(e.target.value)}/>
        </div>

        <div>
          <p>Email</p>
          <input type="email" placeholder="Enter your email..." value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>

        <div>
          <p>Password</p>
          <input type="password" placeholder="Enter your password..." value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </div>

        <button>{state==="SignUp" ? "Sign Up" : "Login"}</button>
      </div>
    </form>
  )
}

export default Login;