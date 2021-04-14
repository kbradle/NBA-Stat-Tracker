import React from 'react';
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <div>Choose your query</div>

            <Link to="/query1">
            <button variant="outlined">
                Query #1
            </button>
            </Link>
            <Link to="/query2">
            <button variant="outlined">
                Query #2
            </button>
            </Link>
            <Link to="/query3">
            <button variant="outlined">
                Query #3
            </button>
            </Link>
            <Link to="/query4">
            <button variant="outlined">
                Query #4
            </button>
            </Link>           
            <Link to="/query5">
            <button variant="outlined">
                Query #5
            </button>
            </Link> 
            <Link to="/info">
            <button variant="outlined">
                Info
            </button>
            </Link>




        </div>
    )
}

export default Home;