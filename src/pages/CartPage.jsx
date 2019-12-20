import React from "react";
import PropTypes from "prop-types";
import { FaRegTrashAlt } from "react-icons/fa";
import "../components/cart.css";
import FancyButton from "../components/FancyButton.jsx";
import {connect} from "react-redux";
import {removeItem} from "../store/actions.js";
import {toast} from "react-toastify";
import * as selectors from "../store/selectors";

class CartPage extends React.PureComponent {
    static propTypes = {
        cart: PropTypes.arrayOf(PropTypes.shape(ItemProps)).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    calcNumbers = () => {
        const VAT = 20;
        const sum = Math.round(this.props.cart.reduce((acc, item) => acc + item.price, 0)) ;
        const tax = Math.round(sum / 100 * VAT);
        return {
            sum, tax
        };
    };

    handleTrash = (_id) => {
        this.props.dispatch(removeItem(_id));
        toast.success("Item removed!");
    };

    render(){
        const {sum, tax} = this.calcNumbers();
        return (
            <div className={"spacer"}>
                <div className={"box cart"}>
                    <Table
                        onTrash={this.handleTrash}
                        rows={this.props.cart}
                    />
                </div>
                <div className={"box cart__summary"}>
                    <table>
                        <tbody>
                        <tr><td>Vahesumma</td><td>{sum} €</td></tr>
                        <tr><td>Maksud</td><td>{tax} €</td></tr>
                        <tr><td>Kokku</td><td>{tax + sum} €</td></tr>
                        <tr>
                            <td></td>
                            <td>
                                <FancyButton onClick={() => console.log("Vormista ost")}>
                                    Vormista ost
                                </FancyButton>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const Table = ({rows, onTrash}) => {
    return (
        <div className={"table"}>
            <div className={"row"}>
                <div className={"cell"}>Toode</div>
                <div className={"cell cell--grow"}>Nimetus</div>
                <div className={"cell"}>Kategooria</div>
                <div className={"cell cell-right"}>Summa</div>
                <div className={"cell cell--small"}></div>
            </div>
            {rows.map((row, index) => <Row onTrash={onTrash} key={index} {...row} />)}
        </div>
    );
};

Table.propTypes = {
    rows: PropTypes.array.isRequired,
    onTrash: PropTypes.func.isRequired,
};

const Row = ({_id, title, imgSrc, category, price, onTrash}) => {
    return (
        <div className={"row"}>
            <div className={"cell"}>
                <img src={imgSrc} />
            </div>
            <div className={"cell cell--grow"}>
                {title}
            </div>
            <div className={"cell"}>
                {category}
            </div>
            <div className={"cell cell--right"}>
                {price} €
            </div>
            <div className={"cell cell--small cell--center"}>
                <FaRegTrashAlt
                    title={"Remove"}
                    className="hover--opacity"
                    onClick={() => onTrash(_id)}
                />
            </div>
        </div>
    );
};

export const ItemProps = {
    _id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

Row.propTypes = {
    ...ItemProps,
    onTrash: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => {
    return {
        cart: selectors.getCart(store)
    };
};

export default connect(mapStateToProps)(CartPage);