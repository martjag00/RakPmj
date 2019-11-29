import React from "react";
import PropTypes from "prop-types";

class ItemPage extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.fetchItem();
    }

    fetchItem = () => {
        fetch(`/api/v1/items/${this.props.match.params.itemId}`)
        .then( res=> {
            return res.json();

        })
        .then(item =>{
            console.log("item", item);
            this.setState({
                ...item
            });
        })
        .catch(err => {
            console.log("item page", err);
        });
    }

    render() {
        console.log("itemId", this.props.match.params.itemId);

        return (
            <>
                <div className={"itemContainer"}>
                    <img src={this.state.imgSrc} />
                    <div className={"item__title"}>{this.state.title}</div>
                    <div className={"item__price"}>{this.state.price}</div>
                </div>
            </>
        );
    }
}

ItemPage.propTypes= {
    match: PropTypes.object.isRequired,
};

export default ItemPage;


