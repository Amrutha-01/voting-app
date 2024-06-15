import React, { useState } from "react";
import { candidatesData } from "./Data/CandidatesInfo";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc ,getDoc, getDocs,updateDoc} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  Card,
  Image,
  CardBody,
  Stack,
  Heading,
  CardFooter,
  Text,
  Button,
} from "@chakra-ui/react";
import auth from "../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { setTokenAutoRefreshEnabled } from "firebase/app-check";
import { isDisabled } from "@testing-library/user-event/dist/utils";
export default function VotingPage() {
  const {uid}=useParams();
  const [userData,setUserData]=useState(null)
  console.log(userData)
const [voteCasted,setVoteCasted] = useState((userData&&userData.voteCount>0)?true:false);
const [candidatesData,setCandidatesData]=useState(null)
const [selectedCandidate,setSelectedCandidate] = useState(null)
console.log(voteCasted,userData)
const navigate =useNavigate()

  const handleVote=(item)=>{
    setSelectedCandidate(item)
    // console.log(selectedCandidate)
      const updateNumberField = async () => {
        try {
          const docRef = doc(db, "users", userData.id);
          const candDocRef=doc(db, "candidates", item.id);
          console.log(candDocRef)
          // Update the number field
          await updateDoc(docRef, {
            ["voteCount"]: userData.voteCount+1,
          });
          await updateDoc(candDocRef, {
            ["votes"]: item.votes+1,
          });
          setVoteCasted(true)
          console.log(voteCasted)
          const updateCandidateVotes = ()=> {
            {candidatesData&&userData.votedCandidate!=null&&candidatesData.map((candidate)=>{
              if(userData.votedCandidate==candidate.id){
                candidate.votes+=1;
              }
            })}
          }
          updateCandidateVotes()
          console.log(`Document ${userData.id} successfully updated!`,docRef);
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      };

      if(userData){
        if(userData.voteCount==0){
          updateNumberField()
          // updateCandidateVotes()
          setVoteCasted(true)
        }
        setVoteCasted(true)
      setTimeout(()=>{
        navigate("/result")
      },2000)
      
    }
    if(selectedCandidate){
      updateCandidateVotes()
    }
  }

  useEffect(()=>{
    async function getCandidates(){
      await getDocs(collection(db, "candidates"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                      setCandidatesData(newData)         
                console.log(newData);
            })
    }
    getCandidates();
  },[])
  useEffect(()=>{
  },[userData,voteCasted])

  useEffect(()=>{
    async function func(){
      await getDocs(collection(db, "users"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                if (newData){
                  newData.map((item)=>{
                    if(item.uid==uid){
                      setUserData(item)
                    }
                  })
                }              
                console.log(uid,newData);
            })
    }
    func();
  },[voteCasted,selectedCandidate])

  const updateCandidateVotes = function() {
    {candidatesData&&candidatesData.map((candidate)=>{
      if(userData.votedCandidate==candidate.id){
        candidate.votes+=1;
      }
    })}
  }
  // useEffect(()=>{
    const disablebutton=()=>{
      if(userData&&userData.voteCount>1){
        return true;
      }
      else{
        return false;
      }
    }
    // disablebutton()
  // },[userData])

  return (
    <div style={{ margin: "40px 10px" }}>
      <NavBar/>
      <h1 style={{ fontSize: "50px", marginBottom: "50px" }}>Vote Now</h1>
      {candidatesData&&candidatesData.map((item, id) => (
        <Card
          direction={{ base: "column", sm: "row" }}
          mb="30px"
          mt="30px"
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={item.img}
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">{item.name}</Heading>

              <Text py="2">{item.description}</Text>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme={"blue"} onClick={()=>{handleVote(item)}} isDisabled={voteCasted}>
                {voteCasted?"Already voted":"Vote"}
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      ))}
    </div>
  );
}
