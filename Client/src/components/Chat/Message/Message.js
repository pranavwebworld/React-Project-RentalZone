import React from 'react'
import "./message.css"

const Message = ({own}) => {
    return (
        <div className="chatBoxContainer"  >
            <div className= {own ? "mesaage own":"message" }>

                <div className="messageTop">


                    <img  className="messageImg" src="https://media.istockphoto.com/photos/productivity-powered-by-digital-technology-picture-id1330965067?b=1&k=20&m=1330965067&s=170667a&w=0&h=ys_MV3zYkn2HJCtHC4s_03Sz1MUC2BZv6PcDdk__XSc=" alt=""/>
                    <p className="messageText"  >orem Ipsum is simply dummy text of the printing and typesetting industry. </p>


                </div>
                    <div className="messageBottom"> 1 Hr ago



                    </div>


   


            </div>
            


        </div>
    )
}

export default Message
