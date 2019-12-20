import React from "react";
import "./form.css";
import PropTypes from "prop-types";
import {toast} from "react-toastify";
import * as services from "../services.js";


class SignupPage extends React.PureComponent {

    static propTypes = {
        history: PropTypes.object.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:""
        };
    }
    handleSubmit = (event) =>{
        event.preventDefault();
            services.signup(this.state)
            .then( () => {
                this.props.history.push("/login");
                toast.success("Registration was successful!");
            })
            .catch(err =>{
                console.log("Error", err);
                toast.error("There was an error creating your account!");
            });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render(){
        return (
            <div className="form">
                <form className="register-form" onSubmit={this.handleSubmit}>
                    <input name={"email"}  value={this.state.email} onChange={this.handleChange} type="email"  required="required"/>
                    <input type="password" placeholder="password" name={"password"} onChange={this.handleChange}/>
                    <button>create</button>
                    <p className="message">Already registered? <a href={"/login"}>Sign In</a></p>
                </form>
            </div>
        );
    }
}

export default SignupPage;