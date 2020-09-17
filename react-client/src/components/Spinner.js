import React from 'react';
import spinner from '../spinner.svg';

export default function Spinner() {
    return (
        <img src={spinner} className="spinning" alt="spinner"/>
    );
}