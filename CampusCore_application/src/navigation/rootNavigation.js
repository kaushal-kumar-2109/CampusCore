import React, { useEffect } from "react";
import {Text} from "react-native";
import { useState } from "react";

import { SetupNavigation } from "./setupNavigation.js";
import { AdminNavigation } from "./adminNavigation.js";
import { StaffNavigation } from "./staffNavigation.js";
import { StudentNavigation } from "./studentsNavigation.js";

import { getUserData } from "../database/controllers/querryRunner.js";

const RootNavigator = () => {
    const [getLoading, setLoading] = useState(true);
    const [getUserRole, setUserRole] = useState(null);
    const [getUserToken, setUserToken] = useState(null);

    useEffect(()=>{
        const checkAuth = async () => {
        const userData = await getUserData();
        if (userData.status==200) {
          setUserRole(userData.data.authorize);
          setUserToken(userData.data.token);
        }
        setLoading(false);
    };
    checkAuth();
    },[]);

    if(getLoading){
        return(<><Text>Loding...</Text></>);
    }
    if (!getUserRole) {
        return <SetupNavigation />;
    }
    if(getUserRole === "student"){
        return(<>
        <StudentNavigation />
        </>);
    }
    if(getUserRole === "staff"){
        return(<>
        <StaffNavigation />
        </>);
    }
    if(getUserRole === "college_admin"){
        return(<>
        <AdminNavigation />
        </>);
    }
    
    return(<>
        <SetupNavigation />
    </>)
}

export {RootNavigator};