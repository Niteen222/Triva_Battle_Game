import React from "react";
import "../Navbar/Navbar.css"
import logo from "../image/game-logo .png"


const Navbar = () => {
    return (
        <>
            <div className="heading-section">
                <img src={logo} alt="" />
                <h1 className="two-heading">Two Player Triva Game</h1>
                <img src={logo} alt="" />
            </div>

        </>
    );
};


export default Navbar