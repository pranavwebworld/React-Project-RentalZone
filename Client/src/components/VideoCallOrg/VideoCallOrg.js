import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import VideocamTwoToneIcon from '@mui/icons-material/VideocamTwoTone';
import React, { useContext, useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import "./VideoCallOrg.css"

import AuthContext from "../../context/AuthContext";
import VendorContext from "../../context/VendorContext";
import UserList from "../Chat/UserListItem/UserList"
import { useNavigate } from "react-router"





function VideoCallOrg() {
    const { currentUser } = useContext(AuthContext);
    const { currentVendor } = useContext(VendorContext);
    const navigate = useNavigate()
    const socket = useRef();
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const [buttonState, setButtonState] = useState(false);
    const [socketUsers, setsocketUsers] = useState("");
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()


    useEffect( () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        })



        
        socket.current = io.connect('http://localhost:5001')
         
            socket.current.on("me", (id) => {

            setMe(id)

                if (currentUser) {

                    try {

                        console.log({ id },);

                        socket.current.emit("addUser", currentUser?.aud, id);

                        console.log(currentUser?.aud);

                        socket.current.on("getUsers", (users) => {

                            setsocketUsers(users);

                            console.log(users, " user in get users ");

                            if (users?.length > 1) {

                                const vendorId = users.find(

                                    (user) => user.userId !== currentUser.aud


                                )

                                
                                console.log(vendorId, "Video call vendorId video call");

                                setIdToCall(vendorId?.socketId)

                                console.log(users, currentVendor.aud, currentUser.aud, vendorId);
                                    
                                
                                setTimeout(callUser(idToCall),2000)

                         

                            }

                        });



                        
                    } catch (error) {

                        console.log(error);
                        
                        
                    }

                    
                } else {
                    console.log({id});

                    socket.current.emit("addUser", currentVendor?.aud, id);

                    socket.current.on("getUsers", (users) => {
                        setsocketUsers(users);

                        console.log({ users });
                    });
                }

                

        })


        socket.current.on("callUser", (data) => {

            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)


        })


        socket.current.on("callEnded", () => {

            console.log("recieved call ended");
            navigate('/chat')
            setCallEnded(true)
            connectionRef.current.destroy()
            socket.current.disconnect()
        

        })



        // return () => {

        //     setCallEnded(true)
     

        // }


    }, [])



    const callUser = (id) => {

        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data) => {

            socket.current.emit("callUser", {

                userToCall: id,
                signalData: data,
                from: me,
                name: name

            })
        })

        peer.on("stream", (stream) => {

            userVideo.current.srcObject = stream

        })
        socket.current.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }




    const answerCall = () => {

        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.current.emit("answerCall", { signal: data, to: caller })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {


        socket.current.emit("callEnded")
        setCallEnded(true)
        connectionRef.current.destroy()
        socket.current.disconnect()
        navigate('/chat')

    }







    return (
        <>
            <h1 style={{ textAlign: "center", color: '#fff' }}>Rental Zon</h1>
            <div className="container">
                <div className="video-container">
                    <div className="video">
                        {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                    </div>
                    <div className="video">
                        {callAccepted && !callEnded ?
                            <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} /> :
                            null}
                    </div>
                </div>
                <div className="myId">
           
                    <div className="call-button">
                        {callAccepted && !callEnded ? (
                            <Button variant="contained" color="secondary" onClick={leaveCall}>
                                End Call
                            </Button>
                        ) : (
                            <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                                    <VideocamTwoToneIcon fontSize="large" />
                            </IconButton>
                        )}
                       
                    </div>
                </div>
                <div>
                    {receivingCall && !callAccepted ? (
                        <div className="caller">
                            <h1 >{name} is calling...</h1>
                            <Button variant="contained" color="primary" onClick={answerCall}>
                                Answer
						</Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default VideoCallOrg
