import React, { Component } from 'react'
import Layout from "../components/Layout";
import Link from "next/link";
import { authInitialProps } from "../lib/auth";

export default class Index extends Component {

    static async getInitialProps(ctx) {
        const auth = await authInitialProps(ctx);
        return { auth };
    }

    render() {
        return (
            <Layout title="Home" {...this.props}>
                <Link href="/profile">
                    <a>Go to profilee</a>
                </Link>
            </Layout>
        )
    }
}
