import React from 'react'
import {format} from 'timeago.js'
import "./message.css"


const Message =  ({message,own}) => {
    return (
        <div className="chatBoxContainer"  >
            <div className= {own ? "mesaage own":"message" }>

                <div className="messageTop">

                    <img  className="messageImg" src="https://media.istockphoto.com/photos/productivity-powered-by-digital-technology-picture-id1330965067?b=1&k=20&m=1330965067&s=170667a&w=0&h=ys_MV3zYkn2HJCtHC4s_03Sz1MUC2BZv6PcDdk__XSc=" alt=""/>
                    <p className="messageText"  >{message.text}</p>

                </div>

                <div className="messageBottom"> {format(message.createdAt)}

                    </div>
            </div>
        
        </div>
    )
}

export default Message
