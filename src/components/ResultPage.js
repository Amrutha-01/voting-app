import { getDocs,collection } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { useState,useEffect } from "react"
import NavBar from "./NavBar"
import { CardFooter,Text,Button,CardBody,Heading,Stack,Image,Card } from "@chakra-ui/react"

export default function ResultPage() {
  const [candidatesData,setCandidatesData]=useState(null)
  console.log(candidatesData)
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
    return (
      <div>
        <NavBar/>
        <h1 style={{ fontSize: "50px", marginBottom: "50px" }}>Voting Results</h1>
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
              <Heading size="lg">{item.name}</Heading>

              <Text py="2">{item.description}</Text>
            </CardBody>

            <CardFooter>
              <p style={{fontWeight:'bold',fontSize:'22px'}}>Votes: {item&&item.votes}</p>
            </CardFooter>
          </Stack>
        </Card>
      ))}
      </div>
    );
  }
  