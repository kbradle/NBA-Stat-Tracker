import React from 'react';
import {Link} from 'react-router-dom';

const Query3 = () => {
    return(
        <>
        <div>This is where query 3 goes</div>
        <Link to="/">
            <button variant="outlined">
                Home
            </button>
        </Link>
        </>
        
    );
}

export default Query3;