import React, { Component } from 'react'
import LoginForm from "../components/LoginForm";
import Layout from "../components/Layout";
import { authInitialProps } from "../lib/auth";

export default class componentName extends Component {

    static async getInitialProps(ctx) {
        const auth = await authInitialProps(ctx);
        return { auth };
    }

    render() {
        return (
            <Layout title="Login" {...this.props}>
                <LoginForm />
            </Layout>
        )
    }
}
