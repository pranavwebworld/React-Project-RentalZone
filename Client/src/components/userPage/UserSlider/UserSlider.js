import React from "react";
import { useNavigate } from "react-router-dom";
import "./userslider.css";
import { useInView } from "react-intersection-observer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";

const Slider = ({ imageSrc, title, subtitle, flipped }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.4,
  });
  const navigate = useNavigate();

  const renderContent = () => {
    if (!flipped) {
      return (
        <>
          {/* <img alt="Travel" className="slider__image" />
                    <div className="slider__content">
                        <h1 className="slider__title">{}</h1>
                        <p style={{ color: 'white' }} >{}</p>
                    </div> */}
    
          <Stack direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}

            spacing={4}
            padding={2}>
            <Card
              onClick={() => {
                navigate("/category/camera");
              }}
              sx={{ maxWidth: 345, border: "solid 0.5px #ab1941" }}
            >
              <CardActionArea>
                <CardMedia
                  className="Zoomi-In"
                  component="img"
                  height="480rem"
                  image="https://images.unsplash.com/photo-1552168324-d612d77725e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:"500"}} >  Camera </span>
                   
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card
              onClick={() => {
                navigate("/category/gymbal");
              }}
              sx={{ width: "22rem", border: "solid 1px #ab1941" }}
            >
              <CardActionArea>
                <CardMedia
                  className="Zoomi-In"
                  component="img"
                  height="480rem"
                  image="https://images.unsplash.com/photo-1559861796-cc4eb7e3cf01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z2ltYmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{ fontWeight: "500" }} > Gymbals</span>
                
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card
              onClick={() => {
                navigate("/category/lens");
              }}
              sx={{ width: "22rem", border: "solid 1px #ab1941" }}
            >
              <CardActionArea>
                <CardMedia
                  className="Zoomi-In"
                  component="img"
                  height="480rem"
                  width="250rem"
                  image="https://images.unsplash.com/photo-1596265371388-43edbaadab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">

                    <span style={{ fontWeight: "500" }} >Lens</span>
               
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card
              onClick={() => {
                navigate("/category/other");
              }}
              sx={{ width: "22rem", border: "solid 1px #ab1941" }}
            >
              <CardActionArea>
                <CardMedia
                  className="Zoomi-In"
                  component="img"
                  height="480rem"
                  width="21rem"
                  image="https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
           
                    <span style={{ fontWeight: "500" }} >Others</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </>
      );
    } else {
      return (
        <>
          <div className="slider__content">
            <h1 className="slider__title">{title}</h1>
            <p style={{ color: "white" }}>{subtitle}</p>
          </div>
          <img src={imageSrc} alt="Travel" className="slider__image" />
        </>
      );
    }
  };

  return (
    
    <div style={{position:"relative"}} >

    <h1 style={{color:"white",position:"absolute",top:"0rem",left:"15rem",fontWeight:"900"}} > Rent a New Gear   </h1>

    <div className={inView ? "slider slider--zoom" : "slider"} ref={ref}>
      
      {renderContent()}
    </div>
 
    </div>
  );
};

export default Slider;
