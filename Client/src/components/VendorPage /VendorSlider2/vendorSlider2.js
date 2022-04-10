import React,{useEffect,useState} from 'react'
import './vendorslider2.css'
import { useInView } from 'react-intersection-observer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Divider, IconButton, Stack } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "../../../axios/axios"
import EditIcon from '@mui/icons-material/Edit';

import DeleteIcon from '@mui/icons-material/Delete';
import { Flex } from '@chakra-ui/layout';
const Slider = ({ vendor, imageSrc, title, subtitle, flipped,Change }) => {


        const navigate = useNavigate();

        const { ref, inView, entry } = useInView({
          
            threshold: 0.2,
        });

    const [vendorProducts, setVendorProducts] = useState()

    const [Deleted, setDeleted] = useState(false)



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

    }, [Change, vendor, Deleted])




    const  deleteProdcut=  async (id)=>{

        console.log(id);

        try {
            const resp = await axios.delete('/vendors/deleteProduct/'+ id);

            console.log(resp, " Product Deleted");

            setDeleted(true)

         

        } catch (error) {

            console.log(error);
        }

     }

    
    const renderContent = () => {
        if (!flipped) {
            return (
                <div>

                    <div style={{ position: "absolute", top: "-10rem", left: "1rem" }} >

                      <h1 style={{color:"white",fontSize:"3rem",fontWeight:"400"}} >Your Gears</h1>

               
                    </div>
                  
                  <div style={{position:"absolute",top:"-4rem",left:"1rem"}} >
                    
                        <button onClick={() => { navigate("/ProductRegister") }} className="VendorButtons" > Register a new gear  </button>


                    </div>             


                    <Stack
                        
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}

                        spacing={4}
                        padding={2}
                    >
                    

                        {vendorProducts?.map((product, index) => (
                            <Card  key={product._id} sx={{ width: "15rem",  border: "solid 1px #ab1941" }}>
                                <CardActionArea>
                                    <CardMedia
                                        onClick={() => { navigate("/productDetails/" + product?._id) }}
                                        className="Zoomi-In"
                                        component="img"
                                        height="10rem"
                                        width="18rem"
                                        image={product?.Product_pic1}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography  style={{display:"flex"}} gutterBottom variant="h5" component="div">

                                            <span> {product?.productName}  </span>         <span style={{marginLeft:"15px"}} > {product?.inStock ? <h2 style={{ color: "green", fontSize: "20px" }} >In Stock</h2> : <h3 style={{ color: "tomato", fontSize: "20px" }} > In Service </h3>}  </span>

                                        </Typography>
                                        <Typography  variant="body2" color="secondary">
                                                
                                    <div style={{display:Flex,flexDirection:"row"}} >

                                                <Link to="/ProductEditRegister" state={{ PRODUCT: product }}  >
                                                    <IconButton  color="primary" aria-label="add an alarm">
                                                        <EditIcon />
                                                    </IconButton>

                                                </Link>

                                                <IconButton onClick={() => { deleteProdcut(product?._id)}} style={{ marginLeft: "6rem" }} color="error" aria-label="add an alarm">
                                                        <DeleteIcon />
                                                    </IconButton>

                                    </div>

                                           
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        ))}

                    </Stack>

                </div>
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
