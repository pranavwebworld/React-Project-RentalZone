import { React, useState, useContext } from "react";
import "./navbar.css";
import { FiMenu, FiX } from "react-icons/fi";
import { HiOutlineCamera } from "react-icons/hi";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import VendorContext from "../../context/VendorContext";

const Navbar = () => {
  const { getLoggedIn, currentUser } = useContext(AuthContext);
  const { getVLoggedIn, currentVendor } = useContext(VendorContext);
  
  const [cookies, setCookie, removeCookie] = useCookies(["userAccessToken"]);
  const navigate = useNavigate();

  function handleRemoveCookie() {
    removeCookie("userAccessToken");
    removeCookie("vendorAccessToken");

    getLoggedIn();
    getVLoggedIn();

    navigate("/");
  }
  
  const navbarlinks = [
    { url: "/", title: "Home" },
    { url: "/user", title: "User " },
    { url: "/vendor", title: "Vendor" }
   
   
  ];
  


  const [menuClicked, setMenuClicked] = useState(false);

  const toggleMenuClick = () => {
    setMenuClicked(!menuClicked);
  };
  return (
    <nav className="navbar">
      <span className="navbar__logo" style={{ color: "#5D5D5D" }}>
        {" "}
        Rental <span style={{ color: "#ab1941" }}> Zone </span>{" "}
      </span>

      {menuClicked ? (
        <FiX size={25} className={"navbar__menu"} onClick={toggleMenuClick} />
      ) : (
        <FiMenu
          size={25}
          className={"navbar__menu"}
          onClick={toggleMenuClick}
        />
      )}
      <ul
        className={
          menuClicked ? "navbar__list navbar__list--active" : "navbar__list"
        }
      >
        {navbarlinks.map((item, index) => {
          return (
            <li className="navbar__item" key={index}>
              <a className="navbar__link" href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
        {
        
          // (currentUser?  < button onClick={handleRemoveCookie} className="logoutB">    Logout    </button>
          //   : currentVendor ? < button onClick={handleRemoveCookie} className="logoutB">    Logout    </button>
          //   :""
          
          // )


         
         
        
        
        }
       
      </ul>
    </nav>
  );
};

export default Navbar;
