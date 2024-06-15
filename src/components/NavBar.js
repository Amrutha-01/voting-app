import React from 'react'
import auth from '../firebase/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
export default function NavBar() {
    const navigate=useNavigate()
const handleSignout=()=>{
    signOut(auth).then(()=>{
        console.log("signed out")
        navigate("/")
    })
    .catch((err)=>{
        console.log(err)
    })
    
}

  return (
    <div style={{display:"flex",justifyContent:'end',padding:'20px'}}>
        <button onClick={handleSignout} style={{fontSize:'20px',backgroundColor:'white',color:"black",borderRadius:'5px',padding:'4px 15px'}}>Sign out</button>
    </div>
  )
}
