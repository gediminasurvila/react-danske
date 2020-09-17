import React from 'react';
import logo from '../danske-bank-logo.svg';

export default function Header(){
    return (
        <header className="header">
            <nav className="top-nav">
                <a href="/">
                    <img src={logo} className="App-logo" alt="logo" />
                </a>
            </nav>
        </header>
    );
}