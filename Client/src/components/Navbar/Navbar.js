import {React,useState} from "react";
import "./navbar.css";
import { FiMenu, FiX } from "react-icons/fi";
import {HiOutlineCamera} from 'react-icons/hi'

const Navbar = () => {

  const navbarlinks = [
    { url: "", title: "Home" },
    { url: "", title: "Contact" },
    { url: "", title: "About  " },
    { url: "/logout", title: "Logout" },
  ];


  const [menuClicked, setMenuClicked] = useState(false);

  const toggleMenuClick = () => {
    setMenuClicked(!menuClicked);
  };
  return (
    <nav className="navbar">
      <span className="navbar__logo" style={{ color: '#5D5D5D'  }}  > Rental <span style={{ color: '#ab1941'  }}  > Zone </span> </span>

      {menuClicked ? (
        <FiX size={25} className={"navbar__menu"} onClick={toggleMenuClick} />
      ) : (
        <FiMenu
          size={25}
          className={"navbar__menu"}
          onClick={toggleMenuClick}
        />
      )}
          <ul className={
              menuClicked ? "navbar__list navbar__list--active" : "navbar__list"
          }>
        {navbarlinks.map((item, index) => {
          return (
            <li className="navbar__item" key={index}>
              <a className="navbar__link" href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
