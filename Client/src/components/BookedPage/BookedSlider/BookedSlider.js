import { React, useEffect, useState } from 'react'
import './bookedslider.css'
import { useInView } from 'react-intersection-observer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Stack } from '@mui/material';
import {  useNavigate,useParams } from "react-router-dom"
import axios from "../../../axios/axios"
import moment from "moment"
import { BsFillCheckCircleFill} from "react-icons/bs"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    ChakraProvider,
    Container,
    Button
} from '@chakra-ui/react'



const Slider = ({order}) => {



    const navigate = useNavigate()





    return (

        <Container style={{ justifyItems: 'center', justifyContent: "center", alignContent: 'center', display: 'flex' }} >

            <div className="bookingtable"  >





                <ChakraProvider >
                    <TableContainer>
                        <Table borderRadius='10px' maxWidth="800" bgColor="transparent" color="white" variant='simple' colorScheme="facebook">
                            <TableCaption>Order Details</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Gear Details</Th>
                                    <Th>Days</Th>
                                    <Th >Starting Date</Th>
                                    <Th >Return date</Th>
                                    <Th >Location</Th>
                                    <Th >Total</Th>
                                  
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>{<button onClick={() => { navigate("/productDetails/" + order?.product?._id) }}  style={{border:"1px solid #ab1941",padding:"5px",borderRadius:'10px' }} >{order?.product?.productName}</button>}</Td>
                                    <Td>{order?.Days}</Td>
                                    <Td >{moment(order?.startingDate).format("MMM DD,YYYY")}</Td>
                                    <Td>{moment(order?.endingDate).format("MMM DD,YYYY") }</Td>
                                    <Td>{order?.product.cityName}</Td>
                                    <Td>{order?.total}</Td>
                                </Tr>
                            </Tbody>
                          
                        </Table>
                    </TableContainer>
                </ChakraProvider>

                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: "2rem", margin: '3rem', color:"white",fontSize:"1.5rem"  }}  >     < BsFillCheckCircleFill color="green" fontSize="4rem"   >  </BsFillCheckCircleFill>   <p fontSize="2opx" > Booking request placed  </p>   </div>
               

            </div>
        </Container>
    );
};

export default Slider
