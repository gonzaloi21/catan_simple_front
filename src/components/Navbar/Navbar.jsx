import { NavLink } from "react-router-dom";
import React, {useState} from "react";
import "./Navbar.css";
import LogoutButton from "../LogoutButton/LogoutButton";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="navbar">
            <div className="nav_logo"> 
                <a className="navbar_logo" href="/">
                    <img src='../../../catan.jpg'></img>
                </a>
                Catan 2.0
            </div>
            <div className={`nav_items ${isOpen && "open"}`}>
                <a href="/">Inicio</a>
                <a href="/paginaprincipal">Pagina Principal</a>
                <a href="/reglasjuego">Reglas del Juego</a>
                <a href="/infoequipo">Acerca del equipo</a>
            </div>
            <div className="user-buttons">
                <button className="signup-button">
                    <a href="/signup">Registrarse</a>
                </button>
                <div className="logout-button-container">
                    <LogoutButton />
                </div>
            </div>
            <div className={`nav_toggle ${isOpen && "open"}`} onClick={ () => setIsOpen(!isOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}
export default Navbar