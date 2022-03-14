// import axios from 'axios';
// import React, { createContext, useEffect, useState } from 'react'


// const AdAuthContext = createContext();


// function AdAuthContextProvider(props) {

//     const [AdloggedIn,setAdLoggedIn]=useState(undefined)

//     useEffect(()=>{

//         getAdloggedIn()

//     },[]);

//     async function getAdloggedIn(){

//         console.log("getAdlogged in called from auth ");

//     const AdloggedInRes= await axios.get("http://localhost:5000/admin/AdloggedIn")

    
//     setAdLoggedIn(AdloggedInRes.data)

//     console.log("AdloggedInRes.data",AdloggedInRes.data);

//     }


//     return (<AdAuthContext.Provider value={{AdloggedIn,getAdloggedIn}} >

//         {props.children}
//     </AdAuthContext.Provider> )
// }
// export default AdAuthContext
// export {AdAuthContextProvider} 
