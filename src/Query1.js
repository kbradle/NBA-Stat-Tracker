import React from 'react';
import {Link} from 'react-router-dom';


function test(param){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "query= select t.team_name, sum(d.threepoints_attempted) as \"3PTA\",  Extract(year from g.game_date)as gyear from jawatson.games_details d, jawatson.teams t, JAWATSON.games g where d.team_id = t.team_id and g.game_id = d.game_id and (t.team_name = 'Golden State Warriors' or t.team_name = '"+param+"') group by t.team_name, Extract(year from g.game_date) order by Extract(year from g.game_date) asc";

    xhr.send(data);


    // called after the response is received
    xhr.onload = function() {
        if (xhr.status !== 200) { 
            alert(`Error ${xhr.status}: ${xhr.statusText}`); 
        } else { 
            var div = document.createElement("div");
            var obj = JSON.parse(xhr.responseText);
            //div.innerHTML = obj.message.rows[0][0];
            div.innerHTML = xhr.responseText;
            document.body.appendChild(div);
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


class Query1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
      }
      mySubmitHandler = (event) => {
        event.preventDefault();
        test(this.state.teamName); 
      }
      myChangeHandler = (event) => {
        this.setState({teamName: event.target.value});
      }
    render(){
        return(
            <>
            <h1>Compare Three Point Attempts to GSW</h1>
            <form onSubmit={this.mySubmitHandler}>
                <label>
                    Team Name:
                    <input type="text"  onChange={this.myChangeHandler}/>
                </label>
                <input type="submit" />
            </form>
            <Link to="/">
                <button variant="outlined">
                    Home
                </button>
            </Link>
            <br/><br/>
            <div>
                TEAM_NAMES<br/>                                         
                --------------------------------------------------<br/>
                Atlanta Hawks <br/>
                Boston Celtics<br/>
                New Orleans Pelicans<br/>
                Chicago Bulls<br/>
                Dallas Mavericks<br/>
                Denver Nuggets<br/>
                Houston Rockets<br/>
                Los Angeles Clippers<br/>
                Los Angeles Lakers<br/>
                Miami Heat<br/>
                Milwaukee Bucks<br/>
                Minnesota Timberwolves<br/>
                Brooklyn Nets<br/>
                New York Knicks<br/>
                Orlando Magic<br/>
                Indiana Pacers<br/>
                Philadelphia 76ers<br/>
                Phoenix Suns<br/>
                Portland Trail Blazers<br/>
                Sacramento Kings<br/>
                San Antonio Spurs<br/>
                Oklahoma City Thunder<br/>
                Toronto Raptors<br/>
                Utah Jazz<br/>
                Memphis Grizzlies<br/>
                Washington Wizards<br/>
                Detroit Pistons<br/>
                Charlotte Hornets<br/>
                Cleveland Cavaliers<br/>
            </div>
            </>
            
        );
    }
}

export default Query1;