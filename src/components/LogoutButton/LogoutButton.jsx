import React, { useContext, useState } from "react";
import './LogoutButton.css'
import { AuthContext } from "../../auth/AuthContext";

const LogoutButton = () => {
    const { tokens, logout } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = (mail) => {
        logout(mail);
        setShowDropdown(false);
        window.location.reload();
        alert('Cierre de sesión exitoso');
    }

    return (
        <>
            <ul>
                {Object.keys(tokens).length > 0 && ( // Verifica si hay tokens almacenados
                <li className="logout-button">
                    <button className="logout-button-toggle" onClick={() => setShowDropdown(!showDropdown)}>Cerrar Sesión</button>
                    {showDropdown && (
                    <ul className="logout-button-dropdown">
                        {Object.entries(tokens).map(([mail, token]) => (
                        <li key={mail} onClick={() => handleLogout(mail)}>
                            {mail}
                        </li>
                        ))}
                    </ul>
                    )}
                </li>
                )}
            </ul>
        </>
    )
}

export default LogoutButton;