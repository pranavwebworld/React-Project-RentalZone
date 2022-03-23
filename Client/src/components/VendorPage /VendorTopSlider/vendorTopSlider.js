import React from 'react'
import './vendorslider.css'
import { useInView } from 'react-intersection-observer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Stack } from '@mui/material';

const Slider = ({ imageSrc, title, subtitle, flipped }) => {

 
        const { ref, inView, entry } = useInView({
          
            threshold: 0.2,
        });

        
    const renderContent = () => {
        if (!flipped) {
            return (
                <>
                    {/* <img src={imageSrc} alt="Travel" className="slider__image" />
                    <div className="slider__content">
                        <h1 className="slider__title">{title}</h1>
                        <p style={{ color: 'white' }} >{subtitle}</p>
                    </div> */}

                

                <Stack
                
                        direction="row"
                        justifyContent="center"

                        spacing={4}
                        padding={2}
                        >

                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image="https://images.unsplash.com/photo-1505739998589-00fc191ce01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Camera
          </Typography>
                                    <Typography variant="body2" color="text.secondary">

                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>


                        <Card  sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image="https://images.unsplash.com/photo-1505739998589-00fc191ce01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                      Gymbals
          </Typography>
                                    <Typography variant="body2" color="text.secondary">

                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image="https://images.unsplash.com/photo-1505739998589-00fc191ce01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Camera
          </Typography>
                                    <Typography variant="body2" color="text.secondary">

                                    </Typography>
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
                        <p style={{ color: 'white' }}  >{subtitle}</p>
                    </div>
                    <img src={imageSrc} alt="Travel" className="slider__image" />


                

                </>
            );
        }
    };

    return (
        <div className={inView?'slider slider--zoom':'slider'} ref={ref} >

            {renderContent()}


        </div>
    );
};

export default Slider
