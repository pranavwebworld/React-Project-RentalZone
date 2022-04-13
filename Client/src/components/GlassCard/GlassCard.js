import React from 'react';
import Campic from '../../assets/CategoryCamera.jpeg';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { Button, Stack } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { useNavigate, useParams } from "react-router";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    ChatButton: {
        color: 'white',
        [theme.breakpoints.only("sm")]: {
            display: "none",
        },
    }
}));

const Container = styled(animated.div)`
display: inline-block;
padding: 3em;
background:rgba(231, 204, 211, 0.12);
border-radius: 10px;
z-index: 1;
position: relative;
backdrop-filter: blur(8px);
border: 2px solid transparent;
background-clip: border-box;
cursor: pointer;
margin-left: 17rem;
border-radius:20px
`;

const StyledImg = styled.img`
    width: 200px;
    height: 250px;
    border: 2px solid #000;
    border-radius: 10%;
    padding:5px;
`;

const StyledH1 = styled.h1`
    line-heright: 1.5;
    letter-spacing: 3.5;
    color:white;
    font-weight:100
    
`;

const StyledH3 = styled.h3`
    line-height: 1.8;
    letter-spacing: 6.15;
       font-weight:100
    font-size: 19px;
    color:white;
`;

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`







const GlassCard = ({product,user}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: config.default }))
    return (
        <Container

              
            onMouseMove={({ clientX: x, clientY: y }) => (set({ xys: calc(x, y) }))}
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{
                transform: props.xys.interpolate(trans),

            
            }}

                className={"glass"}
        
        >   
            <Stack
            
                direction={{ xs: 'column', sm: 'row' }}
              >

                <StyledImg src={product?.Product_pic1} />
                <StyledImg src={product?.Product_pic2} />
                <StyledImg src={product?.Product_pic3} />

            </Stack>
          



            <StyledH1  >{product?.productName} <br /> <br /> <span style={{ fontWeight: "3800", color: "lightgray" }} >₹ {product?.rent}/Day   </span>  </StyledH1> 

            {user && <Button
                className={classes.ChatButton}
                size={"large"}
                startIcon={< MessageIcon />}
                variant={"contained"}
                color="success"
                id="ChatButton"
                onClick={() => {

                    navigate("/chat/" + product.vendorId)
                }}
            >
                Start a Conversation
            </Button>          }
                 

            <StyledH3>{product?.productDesc} <br /> </StyledH3>
        </Container>
    );
}



export default GlassCard;