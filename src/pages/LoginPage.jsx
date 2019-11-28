import React from "react";
import "./form.css";

class LoginPage extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:""
        };
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        console.log("submit", this.state);
    };

    handleChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value,
        });
    };

    render(){
        return (
            <div className="form">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button>login</button>
                    <p className="message">Not registered? <a href="#">Create an account</a></p>
                </form>
            </div>
        );
    }
}

export default LoginPage;