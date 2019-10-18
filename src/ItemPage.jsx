import React from "react";
import Header from "./Header.jsx";
import {phones} from "./mydatabase.js";

class ItemPage extends React.PureComponent {

    render() {
        return (
            <>
                <Header/>
                <div className={"itemContainer"}>
                    <img src={item.imgSrc} />
            </>
        )
    }
}

export default ItemPage;


