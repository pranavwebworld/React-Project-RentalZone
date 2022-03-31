import {React,useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import './bookedslider.css'
import { useInView } from 'react-intersection-observer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Stack } from '@mui/material';
import axios from "../../../axios/axios"




const Slider = ({ flipped, category }) => {

      const [products, setProducts] = useState()

        const { ref, inView, entry } = useInView({
          
            threshold: 0.4,
        });
    const navigate = useNavigate();
     

        useEffect(() => {


            console.log(category,"category name ");



            const Products = async () => {

                try {

                const resp = await axios.get('/users/getCatproduct/'+category);

                console.log(resp.data, "All products");

                let foundProducts = resp.data

                console.log({ foundProducts });
 
                setProducts(foundProducts)

                } catch (error) {

                    console.log(error);
                }
            };

            
            Products()

       
        }, [category])




    const renderContent = () => {

        if (!flipped) {
            return (
                <>
                 

                    <Stack

                        direction="row"
                        justifyContent="right"

                        spacing={4}
                        padding={2}


                    >

                        {products?.map((product,index)=>(


                            <Card onClick= { ()=>{navigate("/productDetails/"+product?._id)}}  key={index}  sx={{ width: "15rem", border: "solid 1px #ab1941" }}>
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
                                            {product.cityName}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            

                        ) )}


                    </Stack>




                </>
            );
        } else {
            return (
                <>
                  
                   
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
