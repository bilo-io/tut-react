import React from 'react';

const Navbar = (props) => {
    return (
        <div className="app-navbar">
            <img src="./assets/favicon.ico" />
            <label>{props.appTitle}</label>
        </div>
    )
}

export default Navbar;