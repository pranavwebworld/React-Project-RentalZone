import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../../../context/AuthContext";
import  VendorContext from "../../../context/VendorContext"
import './chatProfile.css'
import { BsCameraReelsFill } from "react-icons/bs"
import { IoIosCall } from "react-icons/io"
import axios from "../../../axios/axios";




const ChatProfile = ({Users,profile,CF}) => {

    const [Chatbuddy, setChatbuddy] = useState(null);
     const[user,setUser]=useState(null)

    const { currentUser } = useContext(AuthContext);
    const{currentVendor}=useContext(VendorContext)

    useEffect(() => {
        

        console.log({Users});

       
        const getChatbuddy = async () => {

            try {
                

                if(currentVendor){

                    console.log('Chat buddy is User');
                  
                    const friendId = profile?.members.find((m) => m !== currentVendor?.aud);

                    const resp = await axios.get('/users/getbyId?userId=' + friendId);
                    console.log(resp.data, " chat buddy details ");
                    let USER = resp.data
                    setChatbuddy(USER)


                }else {

                    console.log('Chat buddybis vendor');
                    
                    console.log(profile,"profile.memebrs");

                    const friendId = profile?.members.find((m) => m !== currentUser?.aud);
              
                    const resp = await axios.get('/vendors/getbyId?vendorId=' + friendId);
                    console.log(resp.data, " chat buddy details ");
                    let USER = resp.data
                    setChatbuddy(USER)

                    

                }

            } catch (error) {

                console.log(error);
            }
        };

        getChatbuddy()
    }, [profile]);




    return (

        <div className="chatOnline" >

            <div className="ChatOnlineFriend" >

                <img className="chatOnlineImg" src={Chatbuddy?.propic} alt="" />

                <div className="buttongroup">
                    <span className="chatOnlineName"> {Chatbuddy?.name} </span>
                    <BsCameraReelsFill onClick={() => { CF(Users) }}   className="VideoIcon" color="green" fontSize="30px" />
                    <IoIosCall className="callIcon"  color="green" fontSize="30px" />

                </div>
                <button className="profileButton" >View Profile </button>

            </div>

        </div>
    )
}

export default ChatProfile
