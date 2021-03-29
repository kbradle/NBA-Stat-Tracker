import React from 'react';
import {Link} from 'react-router-dom';

const Query1 = () => {
    return(
        <>
        <div>This is where query 1 goes</div>
        <Link to="/">
            <button variant="outlined">
                Home
            </button>
        </Link>
        </>
        
    );
}

export default Query1;