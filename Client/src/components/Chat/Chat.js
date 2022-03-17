import React, { useState,useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import ChatNav from "./ChatNav/ChatNav";
import Conversation from "./Conversations/Conversation";
import "./chat.css";
import Message from "./Message/Message";
import ChatProfile from "./ChatProfile/ChatProfile";
import {ImAttachment } from "react-icons/im"
import { BsSearch} from "react-icons/bs"
import axios from '../../axios/axios'
const Chat = () => {

    const [chats,setChats]=useState([])


const fetchChat = async ()=>{

    const data =  await axios.get ('/api/chats')
    setChats(data)

}


useEffect(() => {

setChats()

 
}, [])










    const navbarlinks = [
        { url: "", title: "Home" },
        { url: "", title: "Contact" },
        { url: "", title: "About  " },
        ,
    ];
    return (

        <>
            <Navbar navbarLinks={navbarlinks}></Navbar>

            <div className="messenger">
                <div className="ChatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="search" className="chatMenuInput" > 
                        </input>
                        <BsSearch className="searchIcon " ></BsSearch>
                        <Conversation></Conversation>
                        <Conversation></Conversation>
                        <Conversation></Conversation>
                        <Conversation></Conversation>
                        <Conversation></Conversation>
                        <Conversation></Conversation>
                        <Conversation></Conversation>
                        <Conversation></Conversation>
                        <Conversation></Conversation>
                        <Conversation></Conversation>
                    </div>
                </div>

                <div className="ChatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message />
                            <Message />
                            <Message own={true} />
                            <Message />
                        </div>
                        <div className="chatBoxBottom">

                            
                            <textarea
                            
                                className="chatMessageInput"
                                placeholder="Message"
                            ></textarea>
                            <ImAttachment color="white" cursor="pointer" /> 
                            <button className="chatSubmitButton"> Send </button>
                        </div>
                    </div>
                </div>
                <div className="ChatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatProfile></ChatProfile>


                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
