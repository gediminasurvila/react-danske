import React from 'react';

export default function ErrorMsg(props) {
    return (
        <div className="error">{props.error}</div>
    );
}