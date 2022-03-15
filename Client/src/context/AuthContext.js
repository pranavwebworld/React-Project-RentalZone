import axios from "../axios/axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();


function AuthContextProvider(props) {
  
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [currentUser, setCurrentUser] = useState('');


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


      axios.get("/users/isLoggedIn",{withCredentials:true}).then((resp)=>{

          console.log(resp.data.payload);

          if (resp.data.payload===undefined)
          {
              setLoggedIn(false);

          }else{

              setLoggedIn(true);
              setCurrentUser(resp.data.payload)

          }
          

      })

      

      

        // setLoggedIn(loggedInRes.data);

     
    }


  
    return (
        <AuthContext.Provider
            value={{ loggedIn, getLoggedIn, currentUser, setCurrentUser}}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContext;
export { AuthContextProvider };
