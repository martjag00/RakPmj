import React from "react";
import {Link} from "react-router-dom";
import {profileIcon, cartIcon} from "../icons";
import "./header.css";
import PropTypes from "prop-types";
import authConsumer from "./authConsumer.jsx";


const Header = ({user}) => {
    return (
        <div className="header">
            <Link to={"/"}>
                <img className="header__logo" src="/images/tlu_logo.png"/>
            </Link>
            <div className="header__buttons">
                <div className={"header__button"}>
                    {user.email && <WelcomeIcon user={user} />}

                    {!user.email && <LoginRegisterIcon/>}
                </div>
                <Link to ={"/checkout/cart"} className={"header__button"}>
                    <img src={cartIcon}/>
                    <div className={"header_button-text"}>Cart</div>
                </Link>
            </div>
        </div>
    );
};

Header.propTypes = {
    token: PropTypes.string,
    user: PropTypes.object,
};

const LoginRegisterIcon = () => (
    <Link className = {"header__button"} to={"/login"}>
        <img src={profileIcon} />
        <div className={"header__button-text"}>Login/<br/>Register</div>
    </Link>
);


const WelcomeIcon = ({user}) => (
    <Link className ={"header__button"} to={`/users/${user._id}`}>
        <img src={profileIcon}/>
        <div className={"header__button-text"}>Welcome, {user.email}</div>
    </Link>
);

WelcomeIcon.propTypes={
    user: PropTypes.object,
};

export default authConsumer(Header);