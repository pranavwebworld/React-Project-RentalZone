import React from 'react'
import navbar from './navbar.css'
import { FiMenu, Fix } from "react-icons/fi"


const navbarLink =[{url:"/home" , title:"Home"}]


const Navbar = ({ navbarLinks }) => {
    return (



        <nav className="navbar">

            <ul className="navbar_list" >
                {navbarLinks.map((item)=>{

                    <li className="navbar__item" key={item.title} > 

                    <a className="navbar__link" href={item.url} >     </a>


                    </li>


                }) }

            </ul>



        </nav>
    )
}

export default Navbar
