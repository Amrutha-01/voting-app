import React, { useState } from "react";
import "./Signup.css";
import auth, { db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection,addDoc } from "firebase/firestore";

export const Signup = () => {
  const navigate=useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    voterId: "",
    phNo: "",
    voterIdImg: null,
  });

  const addDocument = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        uid:auth.currentUser.uid,
        name: userData.name,
        email: userData.email,
        password:  userData.password,
        voteCount:0,
        age: userData.age,
        votedCandidate: null,
        voterId: userData.voterId,
        phNo: userData.phNo,
        voterIdImg: userData.voterIdImg,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    const res=createUserWithEmailAndPassword(auth,userData.email,userData.password)
    console.log(res)
    addDocument()
    navigate(`/candidate/${auth.currentUser.uid}`)
    console.log("uid",auth.currentUser.uid)
  }

  // console.log(auth.currentUser);
  return (
    <div>
      <form className="forms" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={userData.age}
          required
          onChange={(e) => setUserData({ ...userData, age: e.target.value})}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          value={userData.phNo}
          onChange={(e) => setUserData({ ...userData, phNo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Voter ID"
          value={userData.voterId}
          required
          onChange={(e) =>
            setUserData({ ...userData, voterId: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="voterid">Upload Voter ID</label>
          <input
            type="file"
            id="voterid"
            required
            value={userData.voterIdImg}
            onChange={(e) =>
              setUserData({ ...userData, voterIdImg: e.target.value })
            }
          />
        </div>
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          required
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
