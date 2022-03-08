import React from 'react'
import "./videocall.css"
import { FcNoVideo } from "react-icons/fc"
import { BsMicMute } from "react-icons/bs"
import { FcEndCall } from "react-icons/fc"


const VideoCall = () => {
    return (
        <div className="videoContainer" >

            <div className="bigWindow">

                <div className="videoIconSet" >


                    <div>
                        <FcEndCall fontSize="2.5rem" />
                    </div>

                    <div className="videoIcon"  >
                        <FcNoVideo fontSize="2.5rem" />
                    </div>

                    <div>
                        <BsMicMute fontSize="2rem" />
                    </div>
                



                </div>



            </div>


            <div className="smallWindow"></div>

        </div>
    )
}

export default VideoCall
