import React from "react";
import { FaAngleRight } from "react-icons/fa";
import PropTypes from "prop-types";
import "./fancybutton.css";

const FancyButton = ({children}) => (
        <div className={"btn btn--fancy"}>
            <div className={"btn-inner"}>
                <div>
                    {children}
                </div>
                <FaAngleRight/>
            </div>
        </div>
    );

FancyButton.propTypes = {
    children: PropTypes.string.isRequired,
};

export default FancyButton;