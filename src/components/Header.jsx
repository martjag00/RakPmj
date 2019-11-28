import React from "react";
import {Link} from "react-router-dom";
import {userIcon} from "../icons";
import {cartIcon} from "../icons";
import "./header.css";

const Header = () => {
    return (
        <div className="header">
            <Link to={"/"}>
                <img className="header__logo" src="/images/tlu_logo.png"/>
            </Link>
            <div className="header__buttons">
                <div className={"header__button"}>
                    <img src={userIcon}/>
                    <div className={"header__button-text"}><a href={"/login"}> Login/Signup</a></div>
                </div>
                <div className={"header__button"}>
                    <img src={cartIcon}/>
                    <div className={"header_button-text"}>Cart</div>
            </div>
        </div>
        </div>
    );
};

export default Header;