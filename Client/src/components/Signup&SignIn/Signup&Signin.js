import React from "react";
import Container from "@mui/material/Container";
import { Box, Grid, ImageList, ImageListItem } from "@mui/material";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import { styled } from "@mui/system";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import Login from "../Signup&SignIn/Login";
import Signup from "../Signup&SignIn/Signup";
import Helmet from "react-helmet"
import './LoginSignup.css'
<a href="https://icons8.com/icon/zA8CKq2IOOWF/camera">Camera icon by Icons8</a>;

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "Bed",
    
  },
  {
    img: "https://images.unsplash.com/photo-1552168324-d612d77725e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtZXJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2FtZXJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1580707221190-bd94d9087b7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1616088886430-ccd86fef0713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1543785832-0781599790c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1491796014055-e6835cdcd4c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Storage",
  },
  {
    img: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Candle",
  },
  {
    img: "https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Coffee table",
  },
  {
    img: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1580707221190-bd94d9087b7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1616088886430-ccd86fef0713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1543785832-0781599790c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1491796014055-e6835cdcd4c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Storage",
  },
];

function HomePage() {
  return (


    <Grid
      backgroundColor="black"
      height="100vh"
      container
      justifyContent={"center"}
    >
      <Helmet>

        <title>  Signup/Login Rental Zone   </title>
        <meta name="description" content="Create or loginin to your account " />

      </Helmet>

      <Grid item sm={false} xs={false} lg={4}>
        <Box
          d="flex"
          justifyContent="center"
          bgcolor="whitesmoke"
          p={4}
          m="80px 25px 25px 25px  "
          borderWidth="2px"
          borderRadius="20px 0px 0px 20px "
          display={{ xs: "none", lg: "block" }}
          sx={{ width: 400, height: 571.5, overflowY: "scroll" }}
        >
          <ImageList variant="masonry" cols={3} gap={8}>
            {itemData.map((item, index ) => (
              <ImageListItem key={index}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Grid>

      <Grid className={'LoginSignup'} item lg={3} xs={12}>
        <Box
          d="flex"
          justifyContent="flex-end"
          bgcolor="whitesmoke"
          p={5}
          m="80px 0 15px 0"
          borderWidth="2px"
          // borderRadius="0px 20px 20px 0px "
          borderRadius={{ lg: "0px 20px 20px 0px", xs:"20px 20px 20px 20px"}}
          style={{ width: "300px" }}
          display={{ xs: "12", sm: "12", lg: "block" }}
        >
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab>Login</Tab>
              <Tab>Signup</Tab>
            </TabsList>
            <TabPanel style={{ height: "487px" }} value={0}>
              <Login />
            </TabPanel>
            <TabPanel style={{ height: "487px" }} value={1}>
              <Signup />
            </TabPanel>
          </TabsUnstyled>
        </Box>
      </Grid>
    </Grid>
  );
}

export default HomePage;
