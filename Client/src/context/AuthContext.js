import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


const AuthContext = createContext();

function AuthContextProvider(props) {

    const [AdloggedIn,setAdLoggedIn]=useState(undefined)
    const [loggedIn,setLoggedIn]=useState(undefined)

    useEffect(()=>{

        getLoggedIn()
        getAdLoggedIn()

    },[]);

    async function getLoggedIn(){

        console.log("getloggged in called from auth ");

    const loggedInRes= await axios.get("http://localhost:5000/auth/loggedIn")

    
    setLoggedIn(loggedInRes.data)
    console.log("loggedInRes.data",loggedInRes.data);

    }
    async function getAdLoggedIn(){

        console.log("getAdlogged in called from auth ");

    const AdloggedInRes= await axios.get("http://localhost:5000/admin/AdloggedIn")

    
    setAdLoggedIn(AdloggedInRes.data)

    console.log("AdloggedInRes.data",AdloggedInRes.data);

    }




    return (<AuthContext.Provider value={{loggedIn,getLoggedIn,getAdLoggedIn,AdloggedIn}} >

        {props.children}
    </AuthContext.Provider> )
}
export default AuthContext
export {AuthContextProvider} 
