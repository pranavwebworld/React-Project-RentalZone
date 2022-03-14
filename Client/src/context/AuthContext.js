import axios from "../axios/axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();


function AuthContextProvider(props) {
  
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {

        getLoggedIn();
    
    }, []);

    async function getLoggedIn() {
        console.log("getloggged in called from auth ");



        // axios.get("/users/isLoggedIn").then((res) => {

        //     console.log(res)
        //     var resp = res.data
         
        //     console.log(resp);


        // }).catch((err) => {

        //     console.log(err.message);

        // })


        const resp = await axios.get("http://localhost:5000/users/isLoggedIn",{withCredentials:true})

         console.log(resp.data.payload);

        if (resp.data.payload)   setLoggedIn(true);


      

        // setLoggedIn(loggedInRes.data);

     
    }


  
    return (
        <AuthContext.Provider
            value={{ loggedIn, getLoggedIn}}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContext;
export { AuthContextProvider };
