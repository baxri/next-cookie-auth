import React, { Component } from 'react'
import Link from "next/link";
import { logOutUser } from "../lib/auth";
import Router from "next/router";

export default class Layout extends Component {

    logOutUser = async () => {
        await logOutUser();
        Router.push('/login');
    }

    render() {

        const { title, children, auth } = this.props;
        const { user = {} } = auth || {};

        return (
            <div className="root">
                <nav className="navbar">
                    <span>Welcome, <strong>{user.name || 'Guest'}</strong></span>
                    <div>
                        {user.email ? (<React.Fragment>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                            <Link href="/profile">
                                <a>Profile</a>
                            </Link>
                            <button onClick={this.logOutUser}>Logout</button>
                        </React.Fragment>) : (<Link href="/login">
                            <a>Login</a>
                        </Link>)}

                    </div>
                </nav>
                <h1>{title}</h1>
                {children}

                <style jsx>{`
                    .root{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
                    
                    .navbar{
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                    }

                    a{
                        margin-right: 0.5em;
                    }
                    
                    button{
                        text-decoration: underline;
                        padding: 0;
                        font: inherit;
                        cursor: pointer;
                        borer-style: none;
                        color: rgb(0,0,238);
                    }

                `}</style>
            </div>
        )
    }
}
