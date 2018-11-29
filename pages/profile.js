import React, { Component } from 'react'
import { getUserProfile } from "../lib/auth";
import { get } from 'http';
import Layout from "../components/Layout";
import { authInitialProps } from "../lib/auth";

export default class Profile extends Component {

    static async getInitialProps(ctx) {
        const auth = await authInitialProps(ctx);

        return { auth };
    }

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
            <Layout title="Profile" {...this.props}>
                <pre>{JSON.stringify(this.props.auth.user, null, 2)}</pre>
            </Layout>
        )
    }
}
