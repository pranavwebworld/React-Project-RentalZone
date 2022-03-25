import axios from '../../../axios/axios'
import React, { useEffect, useState, useContext} from "react";
import "./conversation.css";
import AuthContext from "../../../context/AuthContext";
import VendorContext from "../../../context/VendorContext"




const Conversation = ({ conversation, CurrentUser }) => {
    
  const [chatbuddy, setChatbuddy] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { currentVendor } = useContext(VendorContext) 

  useEffect(() => {
 

    // const friendId = conversation.members.find((m) => m !== CurrentUser.aud);
    // console.log(friendId);


    const getUser = async () => {

      if (currentVendor) {
        const friendId = conversation.members.find((m) => m !== currentVendor.aud);
       
        console.log('Chat buddy is User');
        const resp = await axios.get('/users/getbyId?userId=' + friendId);
        console.log(resp.data, " chat buddy details ");
        let USER = resp.data
        setChatbuddy(USER)
        console.log({ chatbuddy});

      } else {  
        const friendId = conversation.members.find((m) => m !== currentUser.aud);

        console.log('Chat buddybis vendor');
        const resp = await axios.get('/vendors/getbyId?vendorId=' + friendId);
        console.log(resp.data, " chat buddy details ");
        let USER = resp.data
        setChatbuddy(USER)
        console.log({ chatbuddy });
      }

    };

    getUser()
  }, [conversation , CurrentUser ]);

  return (
    <div>   
      <div className="conversation">
        <img
          className="conversationImg"
          src={chatbuddy?.propic}
          alt=""
        />
        <span className="converationName">{chatbuddy?.name} </span>
      </div>
    </div>
  );
};

export default Conversation;