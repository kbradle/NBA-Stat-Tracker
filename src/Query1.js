import React from 'react';
import {Link} from 'react-router-dom';



function test(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = new FormData();
    data.append("query", "select * from country");

    xhr.send("query= select * from country");


    // called after the response is received
    xhr.onload = function() {
        if (xhr.status !== 200) { 
            alert(`Error ${xhr.status}: ${xhr.statusText}`); 
        } else { 
            document.write(xhr.responseText)
        }  
    };

    xhr.onprogress = function(event) {
        if (!event.lengthComputable) {
            alert(`Received ${event.loaded} bytes`); 
        }
    };

    xhr.onerror = function() {
        alert("Request failed");
    };

}
const Query1 = () => {
    return(
        <>
        <div>This is where query 1 goes</div>
        <button variant="outlined" onClick={test}>
                Query
        </button>
        <Link to="/">
            <button variant="outlined">
                Home
            </button>
        </Link>
        </>
        
    );
}

export default Query1;