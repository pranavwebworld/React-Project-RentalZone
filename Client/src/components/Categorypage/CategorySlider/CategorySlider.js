import {React,useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import './categoryslider.css'
import { useInView } from 'react-intersection-observer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Stack } from '@mui/material';
import axios from "../../../axios/axios"
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import FilterListIcon from '@mui/icons-material/FilterList';


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

    const[loading,setLoading]=useState()


    function getLocation() {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
            enableHighAccuracy: true,
        });

        function successLocation(position) {
            // setLatitude(product?.latitude);
            // setLongitude(product.longitude);

            // console.log(latitude);
            // console.log(longitude);
            console.log("HELLO");
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;

            setLoading(false)

            try {

                axios.post('/users/sortByLocation', { userLatitude, userLongitude }).then((resp) => {

                    console.log(resp);

                    setProducts(resp.data.sortedProducts)

                })
                
            } catch (error) {
                console.log(error);
                
            }
        }   



        function errorLocation() {
            console.log("location not available");
        }
    }



    const renderContent = () => {

        if (!flipped) {
            return (
                <>

                <div style={{width:"5 rem",position:'absolute',top:"-6rem",left:"1rem"  }} >
                        <Button
                            fullWidth
                            size={"large"}
                            startIcon={< FilterListIcon />}
                            variant={"Outlined"}
                            className="VendorButtonsR"
                            onClick={() => {
                                getLocation();
                            }}
                        >
                            Sort by Location
                        </Button>

                </div>


                
                    <Stack

                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}

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
