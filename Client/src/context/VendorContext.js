import axios from "../axios/axios";
import React, { createContext, useEffect, useState } from "react";

const VendorContext = createContext();


function VendorContextProvider(props) {
  
    const [VloggedIn, setVLoggedIn] = useState(undefined);

    const [currentVendor, setCurrentVendor] = useState('');


    useEffect(() => {

        getVLoggedIn();
    
    }, []);


    async function getVLoggedIn() {

    console.log("getloggged in called from vendor ");

      axios.get("/vendors/isVLoggedIn",{withCredentials:true}).then((resp)=>{

          console.log(resp.data.payload);

          if (resp.data.payload===undefined)
          {

              setVLoggedIn(false);

          }else{

              setVLoggedIn(true);

              setCurrentVendor(resp.data.payload)
          }
          
      })

        // setLoggedIn(loggedInRes.data);
    }


    return (
       
        <VendorContext.Provider

            value={{ VloggedIn , getVLoggedIn, currentVendor, setCurrentVendor}}
            
            >
            {props.children}
            
        </VendorContext.Provider>   
    );
}

export default VendorContext;
export { VendorContextProvider };