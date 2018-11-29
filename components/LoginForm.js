import React, { Component } from 'react'
import { loginUser } from "../lib/auth";
import Router from "next/router";

export default class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: 'Sincere@april.biz',
            password: 'hildegard.org',
            error: '',
            isLoading: false,
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    showError = err => {
        this.setState({ error: err, isLoading: false });
    }

    handleSubmit = async event => {

        this.setState({ error: '', isLoading: true });

        event.preventDefault();
        try {
            await loginUser(this.state.email, this.state.password);
            Router.push('/profile');
        } catch (err) {
            this.showError(err.message);
        }
    }

    render() {

        const { error, isLoading } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div><input type="text"
                    name="email"
                    placeholder="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                /></div>
                <div><input type="password"
                    name="password"
                    placeholder="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                /></div>
                <button disabled={isLoading} type="submit" onSubmit={this.handleSubmit}>
                    {isLoading ? 'Sending' : 'Submit'}
                </button>

                {error.length > 0 && <div>{error}</div>}
            </form>

        )
    }
}
