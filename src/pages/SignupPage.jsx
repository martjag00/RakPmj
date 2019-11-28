import React from "react";
import "./form.css";

class SignupPage extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            confirmPassword:""
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
                <form className="register-form" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="email address" name={"email"} onChange={this.handleChange}/>
                    <input type="password" placeholder="password" name={"password"} onChange={this.handleChange}/>
                    <input type="password" placeholder="password" name={"confirmPassword"} onChange={this.handleChange}/>
                    <button>create</button>
                    <p className="message">Already registered? <a href="#">Sign In</a></p>
                </form>
            </div>
        );
    }
}

export default SignupPage;