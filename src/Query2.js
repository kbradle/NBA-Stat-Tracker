import React from 'react';
import {Link} from 'react-router-dom';

const Query2 = () => {
    return(
        <>
        <div>This is where query 2 goes</div>
        <Link to="/">
            <button variant="outlined">
                Home
            </button>
        </Link>
        </>
        
    );
}

export default Query2;