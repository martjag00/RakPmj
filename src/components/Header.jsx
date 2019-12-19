import React from "react";
import {Link} from "react-router-dom";
import {profileIcon, cartIcon} from "../icons";
import "./header.css";
import PropTypes from "prop-types";
import authConsumer from "./authConsumer.jsx";
import {connect} from "react-redux";
import {ItemProps} from "../pages/CartPage.jsx";


const Header = ({user, cart}) => {
    return (
        <div className="header">
            <Link to={"/"}>
                <img className="header__logo" src="/static/images/tlu_logo.png"/>
            </Link>
            <div className="header__buttons">
                <div className={"header__button"}>
                    {user.email && <WelcomeIcon user={user} />}

                    {!user.email && <LoginRegisterIcon/>}
                </div>
                <Link to ={"/checkout/cart"} className={"header__button"}>
                    <img src={cartIcon}/>
                    <div className={"header_button-text"}>Cart</div>
                    <Badge>{cart.length}</Badge>
                </Link>
            </div>
        </div>
    );
};

Header.propTypes = {
    token: PropTypes.string,
    user: PropTypes.object,
    cart: PropTypes.arrayOf(ItemProps).isRequired,
};

const Badge = ({children}) => {
    if( children === 0) return null;
    return (
        <span className={"badge"}>
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.number.isRequired,
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

const mapStateToProps = (store) => {
    return {
        cart: store.cart,
    };
};

export default connect(mapStateToProps)(authConsumer(Header));