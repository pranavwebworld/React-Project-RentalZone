import React,{useEffect,useState} from 'react'
import './vendorslider2.css'
import { useInView } from 'react-intersection-observer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Divider, Link, Stack } from '@mui/material';
import { useNavigate } from "react-router";
import axios from "../../../axios/axios"

const Slider = ({ vendor, imageSrc, title, subtitle, flipped }) => {

        const navigate = useNavigate();

        const { ref, inView, entry } = useInView({
          
            threshold: 0.2,
        });

    const [vendorProducts, setVendorProducts] = useState()


    useEffect(() => {


   
        const VendorProducts = async () => {

            try {

                const resp = await axios.get('/vendors/getAllVendorProducts/'+vendor?.aud);

                console.log(resp.data, " All Vendor Products");

                let vendorProducts = resp.data

                setVendorProducts(vendorProducts)

                console.log(vendorProducts);

            } catch (error) {

                console.log(error);
            }
        };

        VendorProducts()

    }, [])



    const renderContent = () => {
        if (!flipped) {
            return (
                <>
                  
                    {/* <div>

                        <button onClick={() => { navigate("/ProductRegister") }} className="VendorButtons" > Register a product  </button>


                    </div> */}

                    

             


                    <Stack
                        
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}

                        spacing={4}
                        padding={2}
                    >
                    

                        {vendorProducts?.map((product, index) => (
                            <Card  onClick={() => { navigate("/productDetails/" + product?._id) }} key={product._id} sx={{ width: "15rem", border: "solid 1px #ab1941" }}>
                                <CardActionArea>
                                    <CardMedia
                                        className="Zoomi-In"
                                        component="img"
                                        height="240rem"
                                        width="18rem"
                                        image={product?.Product_pic1}
                                        alt="green iguana"
                                    />

                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product?.productName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">


                                            {product?.inStock ? <h2 style={{ color: "green" }} >In Stock</h2> : <h3 style={{ color: "tomato" }} > In Service </h3>}

                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        ))}

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
