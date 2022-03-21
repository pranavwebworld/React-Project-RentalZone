import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../../../context/AuthContext";
import './chatProfile.css'
import { BsCameraReelsFill } from "react-icons/bs"
import { IoIosCall } from "react-icons/io"
import axios from "../../../axios/axios";




const ChatProfile = ({profile}) => {

    const [vendor, setvendor] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {


        const friendId = profile?.members.find((m) => m !== currentUser?.aud);

        console.log('chat profile',friendId);

        const getUser = async () => {

            try {

                console.log('get user called in use effect');
                const resp = await axios.get('/users/getbyId?userId=' + friendId);
                console.log(resp.data, " chat buddy details ");
                let USER = resp.data
                setvendor(USER)

            } catch (error) {

                console.log(error);
            }
        };

        getUser()
    }, [profile]);




    return (

        <div className="chatOnline" >

            <div className="ChatOnlineFriend" >

                <img className="chatOnlineImg" src={vendor?.propic} alt="" />

                <div className="buttongroup">
                    <span className="chatOnlineName"> {vendor?.name} </span>
                    <BsCameraReelsFill className="videoIcon" color="green" fontSize="30px" />
                    <IoIosCall  className="callIcon"  color="green" fontSize="30px" />

                </div>
                <button className="profileButton" >View Profile </button>

            </div>

        </div>
    )
}

export default ChatProfile
