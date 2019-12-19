import React from "react";
import {Link} from "react-router-dom";
import {profileIcon, cartIcon} from "../icons";
import "./header.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ItemProps} from "../pages/CartPage.jsx";
import { UserPropTypes } from "../store/reducer.js";



const Header = ({user, cart}) => {
    return (
        <div className="header">
            <Link to={"/"}>
                <img className="header__logo" src="/static/images/tlu_logo.png"/>
            </Link>
            <div className="header__buttons">
                    {user && <WelcomeIcon user={user}/>}
                    {!user && <LoginRegisterIcon />}
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
    user: PropTypes.shape(UserPropTypes),
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
    user: PropTypes.shape(UserPropTypes),
};

const mapStateToProps = (store) => {
    return {
        cart: store.cart,
        user: store.user,
    };
};

export default connect(mapStateToProps)(Header);