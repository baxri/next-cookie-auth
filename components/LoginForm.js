import React, { Component } from 'react'
import { loginUser } from "../lib/auth";

export default class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        await loginUser(this.state.email, this.state.password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div><input type="text"
                    name="email"
                    placeholder="emial"
                    onChange={this.handleChange}
                /></div>
                <div><input type="password"
                    name="password"
                    placeholder="password"
                    onChange={this.handleChange}
                /></div>
                <button type="submit" onSubmit={this.handleSubmit}>Submit</button>
            </form>

        )
    }
}
