import React, { useEffect, useState,useContext } from "react";
import "./vendorslider.css";
import { useInView } from "react-intersection-observer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider, Link, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "../../../axios/axios";
import moment from "moment";
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
  Button,
  Select,
} from "@chakra-ui/react";
import Swal from "sweetalert2"
import VendorContext from "../../../context/VendorContext";

const Slider = ({ orders, imageSrc, title, subtitle, flipped,change }) => {

  const navigate = useNavigate();

  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  });

  const { setstatusChange, statusChange, currentVendor } = useContext(VendorContext);

  const [vendorProducts, setVendorProducts] = useState();

  const [OrderId, setOrderId] = useState();

  const handlePending = async (orderId, e) => {
    console.log(orderId);
    console.log(e.target.value);
    const status = e.target.value;
    

    change()


    try {




      Swal.fire({
        title: `Change status to ${status}?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, !'
      }).then(async (result) => {
        if (result.isConfirmed) {

          


          const resp = await axios.patch(
            "/vendors/Orderstatus/" + status + "/" + orderId
          );

          console.log(resp, " status changed");

          statusChange(!statusChange)
          Swal.fire(
            'Status changed!',
            'Your file has been deleted.',
            'success'
          )
        }
      })




    } catch (error) {
      console.log(error);
    }
  };



  const renderContent = () => {
    if (!flipped) {
      return (

        <div>

          <div style={{ position: "absolute", top: "-7rem", left: "1rem" }} >

            <h1 style={{ color: "white", fontSize: "3rem",fontWeight:"400" }} >Orders</h1>
       

          </div>
      
          <Container style={{ justifyItems: 'center', justifyContent: "center", alignContent: 'center', display: 'flex' }} >

            <div className="tablewidth" >

          <ChakraProvider>
            <TableContainer>
              <Table
               
                bgColor="transparent"
                color="white"
                variant="simple"
                colorScheme="facebook"
  
                size="lg"
              >
                <TableCaption>
                Order Details
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Gear Details</Th>
                    <Th>Days</Th>
                    <Th>Starting Date</Th>
                    <Th>Return date</Th>
                    <Th>Location</Th>
                    <Th>Total</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders?.map((order) => (
                    <Tr key={order._id}>
                      <Td>
                        {
                          <button
                            onClick={() => {
                              navigate(
                                "/productDetails/" + order?.product?._id
                              );
                            }}
                            style={{
                              border: "1px solid #87ceeb ",
                              padding: "5px",
                              borderRadius: "10px",
                            }}
                          >
                            {order?.product?.productName}
                          </button>
                        }
                      </Td>
                      <Td>{order?.Days}</Td>
                      <Td>
                        {moment(order?.startingDate).format("MMM DD,YYYY")}
                      </Td>
                      <Td>{moment(order?.endingDate).format("MMM DD,YYYY")}</Td>
                      <Td>{order?.product.cityName}</Td>
                      <Td>{order?.total}</Td>
                      <Td>
                        {order?.Pending ? (
                          <Select
                            onChange={(e) => handlePending(order._id, e)}
                            iconColor="red"
                            color="tomato"
                            placeholder="Pending"
                          >
                            <option value="Accepted">Accept</option>
                            <option value="Rejected">Reject</option>
                            <option value="Returned">Returned</option>
                          </Select>
                        ) : order?.Accepted ? (
                          <Select
                            onChange={(e) => handlePending(order._id, e)}
                            iconColor="green"
                              color="#00FF40"
                            placeholder="Accepted"
                          >
                            <option value="Returned">Returned</option>
                          </Select>
                        ) : order?.Returned ? (
                          <button>Returned</button>
                        ) :  (
                          <button
                            style={{
                              color: "red",
                              padding: "5px",
                              borderRadius: "10px",
                            }}
                          >

                            Rejected
                            
                          </button>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ChakraProvider>
            </div>
     
          </Container>
       
        </div>
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
    <div  style={{marginBottom:"8rem"}}  className={inView ? "slider slider--zoom" : "slider"} ref={ref}>
      {renderContent()}
    </div>
  );
};

export default Slider;
