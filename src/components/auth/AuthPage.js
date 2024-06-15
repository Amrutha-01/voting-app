import React from "react";
import { Signup } from "./Signup";
import { Signin } from "./Signin";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export const AuthPage = () => {
  return (
    <div className="auth-page" style={{border:"3px solid #6762a0",height:'100vh',width:"30vw",display:"flex",alignItems:"center",justifyContent:"center",margin:'20px',marginTop:"10px"}}>
      <Tabs variant="soft-rounded" colorScheme="purple">
        <TabList>
          <Tab>Sign Up</Tab>
          <Tab>Sign In</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Signup />
          </TabPanel>
          <TabPanel>
            <Signin />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
