import React from 'react';
import Spinner from './Spinner';

export default function Button({disabled, loading, text, clickHandler}) {
    return (
        <>
            <button className="button button-primary" disabled={disabled} onClick={clickHandler}>
                {loading && <Spinner />}
                {text}
            </button>
        </>
    );
}