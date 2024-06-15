import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  Flex,
  Button,
} from "@chakra-ui/react";
// import { candidatesData } from "./Data/CandidatesInfo";
import { Link } from "react-router-dom";
import auth from "../firebase/firebase";
import { useParams ,useNavigate} from "react-router-dom";
import { getDocs,collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import NavBar from "./NavBar";

const Candidates = () => {
  const { uid } = useParams();
  const navigate=useNavigate();
  const [candidatesData,setCandidatesData]=useState(null)
  const [selectedCandidatesData,setSelectedCandidatesData]=useState(null)
  const [UserInfo,setUserInfo]=useState(null)
  console.log(candidatesData,UserInfo)

  useEffect(()=>{
    async function getCandidates(){
      await getDocs(collection(db, "candidates"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                      setCandidatesData(newData)         
                console.log(candidatesData);
            })
    }
    getCandidates();
  },[])

  useEffect(()=>{
    async function func(){
      await getDocs(collection(db, "users"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                if (newData){
                  newData.map((item)=>{
                    if(item.uid==uid){
                      setUserInfo(item)
                    }
                  })
                }              
                console.log(uid,newData);
            })
    }
    func();
  },[])
  return (
    <div style={{ padding: "50px" }}>
      <NavBar/>
      <h1 style={{ fontSize: "60px", padding: "50px", color: "white" }}>
        Candidates
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",

          paddingLeft: "20px",
        }}
      >
        {candidatesData&&candidatesData.map((item, id) => (
          <Card
            maxW="xs"
            style={{ margin: "25px", boxShadow: "10px 10px #878181" }}
            key={id}
          >
            <CardBody>
              <Image
                src={item.img}
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Flex>
                  <Heading size="md" mr="6">
                    {item.name}
                  </Heading>
                  <Text fontWeight="semi-bold">Party: {item.party}</Text>
                </Flex>
                <Divider />
                <Text>{item.description}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </div>
      <div style={{
            backgroundColor: "white",
            padding: "13px",
            borderRadius: "7px",
            marginTop: "30px",
            marginLeft:'50px',
            width:'150px',
            display: "flex",
            backgroundColor:'#6762a0',
            justifyContent: "center",
            alignItems: "center",
          }}>
        <Link to={`/vote/${uid}` }
        >
          Proceed to Vote
        </Link>
      </div>
    </div>
  );
};

export default Candidates;
