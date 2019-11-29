import React from "react";
import {Link} from "react-router-dom";
import {userIcon} from "../icons";
import {cartIcon} from "../icons";
import "./header.css";
import PropTypes from "prop-types";

const Header = (props) => {
    return (
        <div className="header">
            <Link to={"/"}>
                <img className="header__logo" src="/images/tlu_logo.png"/>
            </Link>
            <div className="header__buttons">
                <div className={"header__button"}>
                    {props.user.email && <WelcomeIcon user={props.user} />}
                    {!props.user.email && <LoginRegisterIcon/>}
                </div>
                <div className={"header__button"}>
                    <img src={cartIcon}/>
                    <div className={"header_button-text"}>Cart</div>
            </div>
        </div>
        </div>
    );
};

const LoginRegisterIcon = () => (
    <>
        <img className={"icon"} src={userIcon}/>
        <div className={"header__button-text"}> <a href={"/login"}>Login/<br/>Register</a></div>
    </>
);

const WelcomeIcon = (props) => (
    <>
        <img className={"icon"} src={userIcon}/>
        <div className={"header__button-text"}>
            <Link to={`/users/${props.user._id}`} activeClassName="active">Welcome {props.user.email}</Link></div>
    </>
);

Header.propTypes={
    token: PropTypes.string,
    user: PropTypes.object,
};

WelcomeIcon.propTypes={
    user: PropTypes.object,
};

export default Header;