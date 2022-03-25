import React from 'react'
import {format} from 'timeago.js'
import "./message.css"


const Message =  ({message,own,chatbuddy}) => {
    return (
        <div className="chatBoxContainer"  >
            <div className= {own ? "mesaage own":"message" }>

                <div className="messageTop">

                    <img className="messageImg" src={chatbuddy.pic} alt=""/>
                    <p className="messageText"  >{message.text}</p>

                </div>

                <div className="messageBottom"> {format(message.createdAt)}

                    </div>
            </div>
        
        </div>
    )
}

export default Message
