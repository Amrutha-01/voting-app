import React, { useState } from 'react'
import "./Signup.css"
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
  const navigate=useNavigate();
  const [email, setEmail] =useState("")
  const [password, setPassword] = useState("")

  const handleSubmit=(e)=>{
    e.preventDefault();
    const res=signInWithEmailAndPassword(auth,email,password)
    navigate(`/candidate/${auth.currentUser.uid}`)
    console.log("uid",auth.currentUser.uid)
  }
  return (
    <div>
      <form className="forms" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required value={email}
          onChange={(e) => setEmail(e.target.value )}/>
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value )}/>
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

