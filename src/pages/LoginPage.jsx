import React from "react";
import "./form.css";
import PropTypes from "prop-types";


class LoginPage extends React.PureComponent {

    static propTypes = {
        history: PropTypes.object.isRequired,
        onLogin: PropTypes.func.isRequired,
    };
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password:""
        };
    }
    handleSubmit = (event) => {
        console.log("submit", this.state);
        event.preventDefault();
        fetch("api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(({token, user}) => {
                this.props.onLogin(token, user);
                this.props.history.push(`/users/${user._id}`);
            });
    }

    handleChange = (event) => {
        this.setState({
           [event.target.name]: event.target.value,
        });
    };

    render() {
        return (
            <div className="form">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <input name={"email"} value={this.state.email} onChange={this.handleChange} type="email" required="required"/>
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

export default LoginPage;