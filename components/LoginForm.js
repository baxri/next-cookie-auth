import React, { Component } from 'react'
import { loginUser } from "../lib/auth";
import Router from "next/router";

export default class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: 'Sincere@april.biz',
            password: 'hildegard.org',
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        await loginUser(this.state.email, this.state.password);
        Router.push('/profile');
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div><input type="text"
                    name="email"
                    placeholder="emial"
                    onChange={this.handleChange}
                    value={this.state.email}
                /></div>
                <div><input type="password"
                    name="password"
                    placeholder="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                /></div>
                <button type="submit" onSubmit={this.handleSubmit}>Submit</button>
            </form>

        )
    }
}
