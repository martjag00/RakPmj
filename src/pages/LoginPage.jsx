import React from "react";
import "./form.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { userUpdate, tokenUpdate } from "../store/actions";
import {toast} from "react-toastify";
import * as services from "../services.js";


class LoginPage extends React.PureComponent {

    static propTypes = {
        history: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password:""
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();
        services.login(this.state)
        .then(this.handleSuccess)
        .catch(err => {
            console.log("Error", err);
            toast.error("There was an error logging in!");
        });
    };

    handleSuccess = ({token, user}) => {
        this.props.dispatch(userUpdate(user));
        this.props.dispatch(tokenUpdate(token));
        this.props.history.push(`/users/${user._id}`);
    };

    handleChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value,
        });
    };

    render() {
        return (
            <div className="form">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <input name={"email"} value={this.state.email} onChange={this.handleChange} type="email" required="required" placeholder="email"/>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button>login</button>
                    <p className="message">Not registered? <a href={"/signup"}>Create an account</a></p>
                </form>
            </div>
        );
    }
}

export default connect()(LoginPage);