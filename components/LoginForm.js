import React, { Component } from 'react'

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

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <form>
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
                <button type="submit" onChange={this.handleSubmit}>Submit</button>
            </form>

        )
    }
}
