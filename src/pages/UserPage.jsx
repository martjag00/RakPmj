import React from "react";
import PropTypes from "prop-types";
import { UserPropTypes } from "../store/reducer.js";
import {connect} from "react-redux";

class UserPage extends React.PureComponent {

    static propTypes = {
        user: PropTypes.shape(UserPropTypes),
    };

    render(){
        return (
            <div>
                You are {this.props.user.email}, created at {this.props.user.createdAt}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
    };
};

export default connect(mapStateToProps)(UserPage);
