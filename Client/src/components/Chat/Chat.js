import React, { useState, useEffect, useContext, useRef } from "react";
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
import { io } from "socket.io-client";




import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';




const Chat = () => {

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [buttonState, setButtonState] = useState(false);
  const [socketUsers,setsocketUsers]=useState('')
  const socket = useRef();
  const { currentUser } = useContext(AuthContext);
  const scrollRef = useRef();


const childF  = (currentSocketUsers)=>{

  handleOpen()

  console.log({currentSocketUsers});
console.log('child called')

}

  useEffect(() => { 

    socket.current = io("ws://localhost:8900");

    socket.current.on("welcome", (msg) => {
      console.log({ msg });
    });

    socket.current.on("getMessage", (data) => {
      console.log({ data });
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    console.log({ arrivalMessage });
  }, []);


  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    console.log({ arrivalMessage });
  }, [arrivalMessage, currentChat]);


  useEffect(() => {
    socket.current.emit("addUser", currentUser?.aud);

    socket.current.on("getUsers", (users) => {

      setsocketUsers(users)

      console.log({ users });
    });
  }, [currentUser]);


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
        const resp = await axios.get("/chat/getMsg/" + currentChat?._id);

        console.log(resp.data, "messages resp");
        setMessages(resp.data);
      };

      getMessages();
    } catch (error) {
      console.log(error);
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log({ messages });

  const navbarlinks = [
    { url: "", title: "Home" },
    { url: "/user", title: "Myaccount" },
    { url: "", title: "About  " },
    ,
  ];


  console.log({ currentChat });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser?.aud,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== currentUser.aud
    );


    console.log({ receiverId });

    console.log({ newMessage });

    socket.current.emit("sendMessage", {
      senderId: currentUser.aud,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/chat/msg", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>

      <Navbar navbarLinks={navbarlinks}></Navbar>



   
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <VideoChat Users={socketUsers}  modal={ handleOpen}   ></VideoChat>

        </Box>
      </Modal>
 */}



 


      <div className="messenger">
        <div className="ChatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="search" className="chatMenuInput"></input>
            <BsSearch className="searchIcon "></BsSearch>

            {conversations.map((c, index) => (
              <div
                onClick={() => {
                  setCurrentChat(c);
                }}
              >
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
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === currentUser.aud} />
                   
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Message"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <ImAttachment color="white" cursor="pointer" />
                  <button
                    /*disabled={ (newMessage ===""?true:false) } */ onClick={
                      handleSubmit
                    }
                    className="chatSubmitButton">
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="selectConvo"> Select a Conversation </span>
            )}
          </div>
        </div>
        <div className="ChatOnline">
          <div className="chatOnlineWrapper">

            {currentChat ?
            
            
            <ChatProfile CF={childF} Users={socketUsers}  profile={currentChat} /> :<span>
              
              </span>}

          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
