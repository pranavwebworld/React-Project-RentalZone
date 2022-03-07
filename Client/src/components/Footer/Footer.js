import React from "react";
import { Box, Grid, Container, Link } from "@mui/material";
import '../Footer/footer.css'

function Footer() {
  return (
    <footer className="Fcontainer"  >
      <Box
        px={{ xs: 3, sm: 10   }}
        py={{ xs: 5, sm: 10 }}
        id='#f1'

      >
        

          <Grid  bottom className="tag" container spacing={4}>
            <Grid  item  xs={12} sm={4} spacing={4}>
              <Box pt={5} borderBottom={1} color="white">
                Help{" "}
              </Box>

            <Box pt={2} >
                <Link> Contact </Link>
              </Box>

            <Box pt={2} >
                <Link> Support </Link>
              </Box>

            <Box pt={2} >
                <Link> Privacy </Link>
              </Box>
            </Grid>

            <Grid  item xs={12} sm={4} spacing={4}>
              <Box pt={5} borderBottom={1} color="white">
                Message{" "}
              </Box>

            <Box pt={2}  >
                <Link> Backup </Link>
              </Box>

            <Box pt={2} >
                <Link> History </Link>
              </Box>

            <Box pt={2} >
                <Link> Roll </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4} spacing={4}>
              <Box pt={5} borderBottom={1} color="white">
                Account{" "}
              </Box>

            <Box pt={2} >
                <Link> Login </Link>
              </Box>

            <Box pt={2} >
                <Link> Register </Link>
              </Box>
            </Grid>
          </Grid>

            <Box color='white' textAlign="center" pt={{xs:5,sm:10}} pb={{xs:5,sm:0}} >

            Rental Zone &reg; {new Date().getFullYear()}

            </Box>
  
      </Box>
    </footer>
  );
}

export default Footer;
