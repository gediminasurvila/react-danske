import React, { useState, useEffect} from 'react';
import Spinner from './Spinner';

export default function Overlay({loading, children}) {

    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        //Animated class
        setTimeout(() => {
          setAnimated(true);
        }, 300);  
    }, []);

    return (
        <div className={`overlay animation${animated ? " done-fade" : 'fade'}`}>
            {loading ? <Spinner /> : children}
        </div>
    );
}