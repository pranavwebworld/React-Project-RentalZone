import React from "react";
import Navbar from "../Navbar/Navbar";
import ChatNav from "./ChatNav/ChatNav";
import Conversation from "./Conversations/Conversation";
import "./chat.css";
import Message from "./Message/Message";
const Chat = () => {
    const navbarlinks = [
        { url: "", title: "Home" },
        { url: "", title: "Contact" },
        { url: "", title: "About  " },
    ];
    return (
        <>
            <Navbar navbarLinks={navbarlinks}></Navbar>

            <div className="messenger">
                <div className="ChatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="search" className="chatMenuInput" />
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
                        </div>
                        <div className="chatBoxBottom">

                            <textarea className="chatMessageInput" placeholder="Message" ></textarea>
                            <button className="chatSubmitButton"> Send </button>
                        </div>
                    </div>



                </div>
                <div className="ChatOnline">
                    <div className="chatOnlineWrapper">ONLINE </div>{" "}
                </div>
            </div>
        </>
    );
};

export default Chat;
