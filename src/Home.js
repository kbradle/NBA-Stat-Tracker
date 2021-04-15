import React from 'react';
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <h1>NBA Seasonal Statistics from the 2003 Season to the 2018 Season</h1>
            <h2>Choose your query</h2>
            Three Point Attempts for Teams: 
            <Link to="/query1">
            <button variant="outlined">
                Query #1
            </button>
            </Link>
            <br />
            Per 36 Stats for Players:     
            <Link to="/query2">
            <button variant="outlined">
                Query #2
            </button>
            </Link>
            <br />
            Compare Regular Season and Playoff Games Stats: 
            <Link to="/query3">
            <button variant="outlined">
                Query #3
            </button>
            </Link>
            <br />
            Home Field Advantages for Teams: 
            <Link to="/query4">
            <button variant="outlined">
                Query #4
            </button>
            </Link>          
            <br />
            One Number Metrics for Players: 
            <Link to="/query5">
            <button variant="outlined">
                Query #5
            </button>
            </Link> 
            <br />
            <h2>Additional Database Information</h2>
            <Link to="/info">
            <button variant="outlined">
                Info
            </button>
            </Link>




        </div>
    )
}

export default Home;