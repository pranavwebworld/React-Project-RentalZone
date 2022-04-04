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
import VendorContext from "../../context/VendorContext";
import {
  ChakraProvider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ThemeProvider, ColorModeProvider } from "@chakra-ui/react"

import UserListItem from "../../components/Chat/UserListItem/UserList";

import { useNavigate,useParams } from "react-router";
import { io } from "socket.io-client";

import Helmet from "react-helmet"

import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Box,
  useToast,
  Button,
  Stack,
  Skeleton,
  Input,
} from "@chakra-ui/react";



const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [buttonState, setButtonState] = useState(false);
  const [socketUsers, setsocketUsers] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState();
  const socket = useRef();
  const { currentUser } = useContext(AuthContext);
  const { currentVendor } = useContext(VendorContext);
  const scrollRef = useRef();
  const [searchResult, setSearchResult] = useState();
  const [searchconvo, setSearchconvo] = useState();
  const [modalHeader, setModelHeader] = useState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();





  const {
    isOpen: isOpenReportModal,
    onOpen: onOpenReportModal,
    onClose: onCloseReportModal,
  } = useDisclosure();

  const childF = (currentSocketUsers) => {


    const receiverId = currentChat.members.find(
      (member) => member !== currentUser.aud
    );

      var CALLIING = currentUser.name

    socket.current.emit("VideoCall", {
      senderId: currentUser.aud,
      receiverId: receiverId,
      text: `${CALLIING} wants to make a Video call `,
    });

    console.log({ currentSocketUsers });
    console.log("child called");
  };




   const AcceptCall=()=>{

     const callerId = currentChat.members.find(
       (member) => member !== currentVendor.aud
     )

     const vendorId = currentChat.members.find(
       (member) => member === currentVendor.aud
     )

     console.log({callerId,vendorId});

     socket.current.emit("CallAccepted", {
       callerId: callerId,
       vendorId});

       setTimeout(() => {
         navigate('/video')
       }, 2000);

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


    socket.current.on("getVideoCall", (data) => {
      console.log({ data });
      
      setModelHeader(data.text)

      setTimeout(() => {
        onOpenReportModal();
      }, 2000);

      console.log({modalHeader});

      console.log('video callled.......');

      
    });

    socket.current.on("CallAccepted", () => {


      navigate('/video')
  
    });


  }, []);



  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    console.log({ arrivalMessage });
  }, [arrivalMessage, currentChat]);

  useEffect(() => {

    if (currentUser) {

      socket.current.emit("addUser", currentUser?.aud);

      socket.current.on("getUsers", (users) => {

        setsocketUsers(users);

        console.log({ users });
      });
    } else {

      socket.current.emit("addUser", currentVendor?.aud);

      socket.current.on("getUsers", (users) => {
        setsocketUsers(users);

        console.log({ users });
      });
    }

  }, [currentUser, currentVendor]);




  useEffect(() => {
    const getConversations = async () => {
      try {
        if (currentUser) {
          console.log(currentUser, " Current User in chat get vendor convo ");
          console.log("getting User Conversationss..............");
          const resp = await axios.get("/chat/getuserconvo/" + currentUser.aud);

          console.log(" resp data ", resp.data);

          setConversations(resp.data);

          console.log(conversations);
        } else {
          console.log(
            currentVendor,
            " Current vendor in chat get vendor convo "
          );

          console.log("getting Vendor Conversationss..............");

          const resp = await axios.get(
            "/chat/getvendorconvo/" + currentVendor.aud
          );

          console.log(" resp data ", resp.data);

          setConversations(resp.data);

          console.log(conversations);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, [currentUser, currentVendor]);




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
  }, [currentChat, searchconvo]);



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

    if (newMessage === "") return;

    if (currentUser) {
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
    } else if (currentVendor) {
      const message = {
        sender: currentVendor?.aud,
        text: newMessage,
        conversationId: currentChat._id,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== currentVendor.aud
      );
      console.log({ receiverId });

      console.log({ newMessage });

      socket.current.emit("sendMessage", {
        senderId: currentVendor.aud,
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
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };


  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      return;
    }

    try {
      setLoading(true);

      const vendors = await axios.get(`/chat/search?search=${search}`);

      setLoading(false);
      setSearchResult(vendors.data);

      console.log(vendors, "Search data results....");
    } catch (error) {
      console.log(error);
      toast({
        title: " Failed to load Result ",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    }
  };





  const accessChat = async (vendorId) => {
    try {
      const userId = currentUser.aud;

      const resp = await axios.post("/chat/findOrCreateConvo", {
        userId,
        vendorId,
      });
      console.log(resp.data[0], "  find or create response   ");

      setCurrentChat(resp.data[0]);

      const msgresp = await axios.get("/chat/getMsg/" + resp?.data?._id);

      console.log(msgresp, "messages resp");

      setMessages(msgresp.data);

      setSearchconvo(!resp);
    } catch (error) {
      console.log(error);
    }
  };


  const VENDORID = useParams()


useEffect(() => {



  if (VENDORID) {



      accessChat(VENDORID.vendorId)


  }


}, [])




  return (
    <>


      <Helmet>

        <title>  Chat   </title>
        <meta name="description" content="Make conversation between  user and vendor"/>

      </Helmet>

      <Navbar navbarLinks={navbarlinks}></Navbar>
      <ChakraProvider>

        <Modal isOpen={isOpenReportModal} onClose={onCloseReportModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalHeader}</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onCloseReportModal}>
                Reject
              </Button>
              <Button  onClick={AcceptCall}  variant="ghost">Answer the call</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>

      <div className="messenger">
        <div className="ChatMenu">
          <div className="chatMenuWrapper">
            <input
              onClick={onOpen}
              placeholder="search"
              className="chatMenuInput"
            ></input>

            {conversations.map((c, index) => (
              <div
                onClick={() => {
                  setCurrentChat(c);
                }}
              >
                <Conversation
                  key={index}
                  conversation={c}
                  CurrentUser={currentUser ? currentUser : currentVendor}
                />
              </div>
            ))}
          </div>

          <ChakraProvider>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerHeader borderBottomWidth="1px">
                    Search user
                  </DrawerHeader>
                  <DrawerBody>
                    <Box d="flex" pb={2}>
                      <Input
                        placeholder="Search user"
                        mr={2}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      ></Input>

                      <Button onClick={handleSearch}> Go </Button>
                    </Box>

                    {loading ? (
                      <>
                        <Stack>
                          <Skeleton height="45px" />
                          <Skeleton height="45px" />
                          <Skeleton height="45px" />
                          <Skeleton height="45px" />
                          <Skeleton height="45px" />
                          <Skeleton height="45px" />
                        </Stack>
                      </>
                    ) : (
                      searchResult?.map((user) => (
                        <UserListItem
                          key={user._id}
                          user={user}
                          handleFunction={() => accessChat(user._id)}
                        />
                      ))
                    )}
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </ChakraProvider>
        </div>

        <div className="ChatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, index) => (
                    <div ref={scrollRef}>
                      {currentVendor ? (
                        <Message
                          key={index}
                          chatbuddy={currentVendor}
                          message={m}
                          own={m.sender === currentVendor.aud}
                        />
                      ) : (
                        <Message
                          key={index}
                          chatbuddy={currentUser}
                          message={m}
                          own={m.sender === currentUser.aud}
                        />
                      )}
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
                    className="chatSubmitButton"
                  >
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
            {currentChat ? (
              <ChatProfile
                CF={childF}
                Users={socketUsers}
                profile={currentChat}
              />
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
