import axios from "../axios/axios";
import React, { createContext, useEffect, useState } from "react";

const VendorContext = createContext();


function VendorContextProvider(props) {
  
    const [VloggedIn, setVLoggedIn] = useState(undefined);

    const [currentVendor, setCurrentVendor] = useState('');

    const [statusChange, setstatusChange] = useState(true);

    useEffect(() => {

        // setVLoggedIn(false);

        getVLoggedIn();


        // return ()=>{

        //     setVLoggedIn(false);

        // }

    }, []);



    async function getVLoggedIn() {

    console.log("getloggged in called from vendor ");

        axios.get("/vendors/isVLoggedIn",{withCredentials:true}).then((resp)=>{

          console.log(resp.data.payload);


        


          if (resp.data.payload===undefined)
          {

              setVLoggedIn(false);

          }else{


            localStorage.setItem('vendor',true)

              setVLoggedIn(true);

              setCurrentVendor(resp.data.payload)


          }
      })

        // setLoggedIn(loggedInRes.data);
    }

    return (
       
        <VendorContext.Provider

            value={{ VloggedIn, statusChange, setstatusChange,getVLoggedIn, currentVendor, setCurrentVendor}}
            
            >
            {props.children}
            
        </VendorContext.Provider>   
    );
}

export default VendorContext;
export { VendorContextProvider };