import React, { Component } from 'react'
import { getUserProfile } from "../lib/auth";
import { get } from 'http';

export default class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: null,
        }
    }

    async componentDidMount() {
        const user = await getUserProfile();

        this.setState({ user });
    }

    render() {
        return (
            <pre>
                {JSON.stringify(this.state.user, null, 2)}
            </pre>
        )
    }
}
