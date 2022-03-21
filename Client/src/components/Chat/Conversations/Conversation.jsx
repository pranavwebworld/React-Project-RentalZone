import axios from '../../../axios/axios'
import React, { useEffect, useState } from "react";
import "./conversation.css";

const Conversation = ({ conversation, CurrentUser }) => {
    
  const [vendor, setvendor] = useState(null);



  useEffect(() => {


    const friendId = conversation.members.find((m) => m !== CurrentUser.aud);
    console.log(friendId);


    const getUser = async () => {

      try {

          console.log('get user called in use effect');
          const resp = await axios.get('/users/getbyId?userId='+friendId);
          console.log(resp.data," chat buddy details ");
          setvendor(resp.data)
        
      } catch (error) {

        console.log(error);
      }
    };

    getUser()
  }, [conversation , CurrentUser ]);

  return (
    <div>   
      <div className="conversation">
        <img
          className="conversationImg"
          src={vendor?.propic}
          alt=""
        />
        <span className="converationName">{vendor?.name} </span>
      </div>
    </div>
  );
};

export default Conversation;