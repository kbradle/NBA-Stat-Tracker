import React from 'react';
import {Link} from 'react-router-dom';

const Query5 = () => {
    return(
        <>
        <div>This is where query 5 goes</div>
        <Link to="/">
            <button variant="outlined">
                Home
            </button>
        </Link>
        </>
        
    );
}

export default Query5;