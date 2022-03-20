import React, { useState, useEffect, useContext,useRef } from "react";
import Navbar from "../Navbar/Navbar";
import ChatNav from "./ChatNav/ChatNav";
import Conversation from "./Conversations/Conversation";
import "./chat.css";
import Message from "./Message/Message";
import ChatProfile from "./ChatProfile/ChatProfile";
import { ImAttachment } from "react-icons/im";
import { BsSearch } from "react-icons/bs";
import axios from "../../axios/axios";
import AuthContext from "../../context/AuthContext";
import { useFormControl } from "@mui/material";
import {io} from "socket.io-client"

const Chat = () => {
const [conversations, setConversations] = useState([]);
const [currentChat, setCurrentChat] = useState(null);
const [messages, setMessages] = useState([]);
const [newMessage,setNewMessage]=useState('')
const [socket,setSocket]=useState(null)
const { currentUser } = useContext(AuthContext);const scrollRef = useRef()
  


useEffect(()=>{

setSocket(io("ws://localhost:8900"))

},[])





  useEffect(() => {
    const getConversations = async () => {
      try {
        const resp = await axios.get("/chat/getconvo/" + currentUser.aud);

        console.log(" resp data ", resp.data);

        setConversations(resp.data);

        console.log(conversations);

      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, [currentUser]);



  useEffect(() => {
    try {
      const getMessages = async () => {
        const resp = await axios.get("/chat/getMsg/"+currentChat?._id);

        console.log(resp.data,"messages resp");
        setMessages(resp.data)
      };

      getMessages()
    } catch (error) {
      console.log(error);
    }
  }, [currentChat]);


  useEffect(()=>{

    scrollRef.current?.scrollIntoView({behavior:'smooth'})


  },[messages])

  console.log({messages});


  const navbarlinks = [
    { url: "", title: "Home" },
    { url: "/user", title: "Myaccount" },
    { url: "", title: "About  " },
    ,
  ];

  console.log({currentChat});


  const handleSubmit = async (e)=>{

    e.preventDefault();
    const message={

        sender:currentUser?.aud,
        text:newMessage,
        conversationId:currentChat._id

    }

    try {
        
    const res = await axios.post('/chat/msg',message)
    setMessages([...messages,res.data])
    setNewMessage('')

    } catch (error) {

        console.log(error);
    }
  }


  return (
    <>
      <Navbar navbarLinks={navbarlinks}></Navbar>

      <div className="messenger">
        <div className="ChatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="search" className="chatMenuInput"></input>
            <BsSearch className="searchIcon "></BsSearch>

            {conversations.map((c, index) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation
                  key={index}
                  conversation={c}
                  CurrentUser={currentUser}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="ChatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">

                {
                messages.map((m)=>(

                    <div  ref={scrollRef} >

                        <Message message={m} own={m.sender === currentUser.aud} />
                    </div>
                 

                ) )  }
               
                  
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Message"
                    onChange={(e)=> setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <ImAttachment color="white" cursor="pointer" />
                  <button  onClick={handleSubmit}   className="chatSubmitButton"> Send </button>
                </div>
              </>
            ) : (
              <span className="selectConvo"> Select a Conversation </span>
            )}
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
