import { React, useEffect, useState } from 'react'
import './orderslider.css'
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
import Footer from '../../Footer/Footer';



const Slider = ({orders}) => {

const navigate = useNavigate()


    return (

        <Container style={{ justifyItems: 'center', justifyContent: "center", alignContent: 'center', display: 'flex' }} >

            <div className="tablewidthB"  >

                <ChakraProvider >
                    <TableContainer>
                        <Table borderRadius='10px' maxWidth="800" bgColor="transparent" color="white" variant='simple' colorScheme="facebook">
                            <TableCaption>Imperial to metric conversion factors</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Gear Details</Th>
                                    <Th>Days</Th>
                                    <Th >Starting Date</Th>
                                    <Th >Return date</Th>
                                    <Th >Location</Th>
                                    <Th >Total</Th>
                                    <Th >Status</Th>
                                  
                                </Tr>
                            </Thead>
                            <Tbody>

                                    {   orders?.map((order)=>(

                                        <Tr>
                                            <Td>{<button onClick={()=>{ navigate("/productDetails/" + order?.product?._id) }} style={{ border: "1px solid #87ceeb ", padding: "5px", borderRadius: '10px' }} >{order?.product?.productName}</button>}</Td>
                                            <Td>{order?.Days}</Td>
                                            <Td >{moment(order?.startingDate).format("MMM DD,YYYY")}</Td>
                                            <Td>{moment(order?.endingDate).format("MMM DD,YYYY")}</Td>
                                            <Td>{order?.product.cityName}</Td>
                                            <Td>{order?.total}</Td>
                                            <Td>{order?.Pending ? <button style={{ border: "1px solid #ab1941", padding: "5px", borderRadius: '10px' }} >Pending
                                            </button> : order?.Accepted ? <button  style={{ border: "1px solid green", padding: "5px", borderRadius: '10px' }} >Accepted
                                            </button> : order?.Rejected ? <button style={{color:"red"}} >Rejected</button>
                                                      : <button  >Returned</button> }</Td>
                                        </Tr>
                                    ))      
                              
                                    }
                            </Tbody>
                          
                        </Table>
                    </TableContainer>
                </ChakraProvider>
           
            </div>  
         
        </Container>
    );
};

export default Slider
