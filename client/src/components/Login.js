import React, { Component } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import "../App.css";



class Login extends Component {
  state = {
    credentials: {
        username:"",
        password:""
    }
};

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route


  handleChange = e => {
    this.setState({
        credentials: {
            ...this.state.credentials,
            [e.target.name]: e.target.value
        }
    });
};

  handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("/login", this.state.credentials)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/bubblePage");
      })
      .catch(err => {
        console.log(err)
      });
  };

  render() {
  return (
    <>
      <form className="Login-Form" onSubmit={this.handleSubmit}>
        <h1 className="Login-Header">Welcome to the Bubble App!</h1>
        <input
          className="Login-Input"
          type="text"
          name="username"
          value={this.state.credentials.username}
          placeholder="username"
          onChange={this.handleChange}
        />
        <input
          className="Login-Input"
          type="password"
          name="password"
          value={this.state.credentials.password}
          placeholder="password"
          onChange={this.handleChange}
        />
        <button className="Login-Button">Login</button>
      </form>
    </>
  );
  };
};

export default Login;
