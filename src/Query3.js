import React from 'react';
import {Link} from 'react-router-dom'
import {CanvasJSChart} from 'canvasjs-react-charts'

// 2 teams as input --- X
// option to compare against avg(rest of league) --- X
// group by month --- X
// edit start/end dates --- X
// dhrubo28-patch-1

 
var team1=[];
var team2=[];


function test(firstTeam, secondTeam, groupBy, startDate, endDate, stat, season, homeOrAway){
    team1.length=0;
    team2.length=0;
  

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    let homeOrAwayString;
    let monthOrYearString1;
    let monthOrYearString2;

    if(stat ==='team_wins_bool') {
        homeOrAwayString = "home_";
    } else {
        homeOrAwayString = homeOrAway;
    }

    if(groupBy==='year'){  
        let temp;
        if(season ==='playoff'){
            temp = 4;
            //monthOrYearString1 = "to_char(\"TRUNC(g.GAME_DATE,'YEAR')\",'YYYY-MM')";
            //monthOrYearString2 = "Trunc(g.Game_Date, 'Year')";
        } else {
            temp = 2;
            //monthOrYearString1 = "Extract(year from g.game_date) as GAMES_YEAR";
            //monthOrYearString2 = "Extract(year from g.game_date)";
        }
        monthOrYearString1 = "Extract(year from g.game_date) as GAMES_YEAR";
        monthOrYearString2 = "Extract(year from g.game_date)";
        if(homeOrAwayString === "home_") {
            var datah = "query= select t.team_name, avg(g."+homeOrAwayString+stat+") as stat,  "+monthOrYearString1+" from jawatson.teams t, JAWATSON.games g, jawatson.games_details gd  where gd.team_id = t.team_id and gd.team_id = g.home_team_id and g.game_id = gd.game_id and g.playoff_indicator = "+temp+" and (t.team_name = '"+firstTeam +"' or t.team_name = '"+secondTeam+"') and (g.game_date >= to_date('"+startDate+"', 'YYYY-MM-DD') and   g.game_date <= to_date('"+endDate+"', 'YYYY-MM-DD')) group by "+monthOrYearString2+", t.team_name order by "+monthOrYearString2+" asc"
            xhr.send(datah);
        } else {
            var dataa = "query= select t.team_name, avg(g."+homeOrAwayString+stat+") as stat,  "+monthOrYearString1+" from jawatson.teams t, JAWATSON.games g, jawatson.games_details gd  where gd.team_id = t.team_id and gd.team_id = g.visitor_team_id and g.game_id = gd.game_id and g.playoff_indicator =" +temp+" and (t.team_name = '"+firstTeam +"' or t.team_name = '"+secondTeam+"') and (g.game_date >= to_date('"+startDate+"', 'YYYY-MM-DD') and   g.game_date <= to_date('"+endDate+"', 'YYYY-MM-DD')) group by "+monthOrYearString2+", t.team_name order by "+monthOrYearString2+" asc"
            xhr.send(dataa);
        }
     }
    else {
        let temp1;
        if(season ==='playoff'){
            temp1 = 4;
            //monthOrYearString1 = "to_char(\"TRUNC(GAME_DATE,'MONTH')\",'YYYY-MM')";
            //monthOrYearString2 = "Trunc(Game_Date, 'Month')";
        } else {
            temp1 = 2;
           // monthOrYearString1 = "Extract(year from g.game_date) as GAMES_YEAR, Extract(month from g.game_date) as GAMES_MONTH";
            //monthOrYearString2 = "Extract(year from g.game_date), Extract(month from g.game_date)";
        }
        monthOrYearString1 = "Extract(year from g.game_date) as GAMES_YEAR, Extract(month from g.game_date) as GAMES_MONTH";
        monthOrYearString2 = "Extract(year from g.game_date), Extract(month from g.game_date)";
        if(homeOrAwayString === "home_") {
            var data1h = "query= select t.team_name, avg(g."+homeOrAwayString+stat+") as stat,  "+monthOrYearString1+" from jawatson.teams t, JAWATSON.games g, jawatson.games_details gd  where gd.team_id = t.team_id and gd.team_id = g.home_team_id and g.game_id = gd.game_id and g.playoff_indicator = " +temp1+" and (t.team_name = '"+firstTeam +"' or t.team_name = '"+secondTeam+"') and (g.game_date >= to_date('"+startDate+"', 'YYYY-MM-DD') and   g.game_date <= to_date('"+endDate+"', 'YYYY-MM-DD')) group by "+monthOrYearString2+", t.team_name order by "+monthOrYearString2+" asc"
            xhr.send(data1h);
        } else {
            var data1a = "query= select t.team_name, avg(g."+homeOrAwayString+stat+") as stat,  "+monthOrYearString1+" from jawatson.teams t, JAWATSON.games g, jawatson.games_details gd  where gd.team_id = t.team_id and gd.team_id = g.visitor_team_id and g.game_id = gd.game_id and g.playoff_indicator = " +temp1+" and (t.team_name = '"+firstTeam +"' or t.team_name = '"+secondTeam+"') and (g.game_date >= to_date('"+startDate+"', 'YYYY-MM-DD') and   g.game_date <= to_date('"+endDate+"', 'YYYY-MM-DD')) group by "+monthOrYearString2+", t.team_name order by "+monthOrYearString2+" asc"
            xhr.send(data1a);
        }
    }
    
    // called after the response is received
    xhr.onload = function() {
        if (xhr.status !== 200) { 
            alert(`Error ${xhr.status}: ${xhr.statusText}`); 
        } else { 
           // var div = document.createElement("div");
            var obj = JSON.parse(xhr.responseText);
            //div.innerHTML = xhr.responseText;
             //document.body.appendChild(div);
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
            if(groupBy === 'month'){
                for(var i=0; i<obj.message.rows.length;i++){
                    if(obj.message.rows[i][0]===firstTeam){
                        team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                    }
                    else{
                        team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                    }
                }   
            }
            else{
                for(i=0; i<obj.message.rows.length;i++){
                    if(obj.message.rows[i][0]===firstTeam){
                        team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                    }
                    else{
                        team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                    }
                }    
            }

            
           
          
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

class Query3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstTeam: '', secondTeam: '', groupBy: '', stat: '', startDate:'', endDate:'', team1Name:'', team2Name:'', season:'', tableName:'', homeOrAway:'',};
        this.updateChart = this.updateChart.bind(this);
        this.chart = '';
    }
    mySubmitHandler = (event) => {
        this.setState({team1Name: this.state.firstTeam});
        this.setState({team2Name: this.state.secondTeam});
        this.setState({tableName: this.state.season});
        event.preventDefault();
        test(this.state.firstTeam, this.state.secondTeam, this.state.groupBy, this.state.startDate, this.state.endDate, this.state.stat, this.state.season, this.state.homeOrAway,);
        var x = document.getElementById('chart');
        x.hidden = false;
    }
    ChangeFirst = (event) => {
        this.setState({firstTeam: event.target.value});
    }
    ChangeSecond = (event) => {
        this.setState({secondTeam: event.target.value});
    }
    ChangeOption = (event) => {
        this.setState({groupBy: event.target.value});
    }
    ChangeSeason = (event) => {
        this.setState({season: event.target.value});
    }
    ChangeStartDate = (event) => {
        this.setState({startDate: event.target.value});
    }
    ChangeEndDate = (event) => {
        this.setState({endDate: event.target.value});
    }
    ChangeStat = (event) => {
        this.setState({stat: event.target.value});
        
    }
    ChangeHomeAway = (event) => {
        this.setState({homeOrAway: event.target.value});
    };
    componentDidMount(){
	    setInterval(this.updateChart);
	}
    updateChart() {
      if(this.chart){
        this.chart.render();       
      }    
	}
    
    render(){
        const options = {
            animationEnabled: true,	
            title:{
                text: "Average of Stats per Game"
            },
            axisY : {
                title: "Average of Stats"
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                name: this.state.team1Name,
                showInLegend: true,
                dataPoints: team1
            },
            {
                type: "spline",
                name: this.state.team2Name,
                showInLegend: true,
                dataPoints: team2
            }
            ]
        }
        const teams = ['Atlanta Hawks', 'Boston Celtics','Brooklyn Nets',  'Charlotte Hornets','Chicago Bulls','Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets','Detroit Pistons', 'Golden State Warriors','Houston Rockets',
        'Indiana Pacers', 'Los Angeles Clippers', 'Los Angeles Lakers','Memphis Grizzlies','Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks', 'Orlando Magic',
        'Oklahoma City Thunder', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings','San Antonio Spurs','Toronto Raptors','Utah Jazz','Washington Wizards'];



        return(
            <>
            <h1>Compare Regular Season and Playoff Games Stats</h1>
            <form onSubmit={this.mySubmitHandler}>
                Team 1: 
                <select onChange={this.ChangeFirst} required>
                    <option value=""  >Team 1:</option>
                    {teams.map(c => <option key={c}>{c}</option>)}
                </select>
                Team 2:
                <select onChange={this.ChangeSecond} required>
                    <option value=""  >Team 2:</option>
                    {teams.map(c => <option key={c}>{c}</option>)}
                </select>
                <br />
                Choose a stat:
              <select multiple={false} value={this.props.chosenStat} onChange={this.ChangeStat} required>
                  <option value={""}>-- Choose Statistic --</option>
                  <option value={"points"}>Points</option>
                  <option value={"fieldgoal_percentage"}>Fieldgoal Percentage</option>
                  <option value={"freethrow_percentage"}>Freethrow Percentage</option>
                  <option value={"3point_percentage"}>Threepoint Percentage</option>
                  <option value={"assists"}>Assists</option>
                  <option value={"rebounds"}>Rebounds</option>
                  <option value={"team_wins_bool"}>Home Team Wins Bool</option>
                  
              </select>
              <div className="radio" >             
                    <input type="radio" value="home_" checked={this.state.homeOrAway === 'home_'} onChange={this.ChangeHomeAway}/>home               
                    <input type="radio" value="away_" checked={this.state.homeOrAway === 'away_'} onChange={this.ChangeHomeAway}/>away           
                </div>
                <br/>
                <br/>
                start date: <input type = "date" onChange={this.ChangeStartDate} required/> <br/>
                end date: <input type = "date"onChange={this.ChangeEndDate} required/> 
                
                <br/><br/>

              
              
         
              
                <div className="radio" >             
                    <input type="radio" value="year" checked={this.state.groupBy === 'year'} onChange={this.ChangeOption}/>yearly               
                    <input type="radio" value="month" checked={this.state.groupBy === 'month'} onChange={this.ChangeOption}/>monthly           
                </div>
         
                <div className="radio" >             
                    <input type="radio" value="regular" checked={this.state.season === 'regular'} onChange={this.ChangeSeason}/>regular               
                    <input type="radio" value="playoff" checked={this.state.season === 'playoff'} onChange={this.ChangeSeason}/>playoff           
                </div>



                <input type="submit" />
            </form>
            <Link to="/">
                <button variant="outlined">
                    Home
                </button>
            </Link>
            <br/><br/>
            <div id='chart' hidden>
                <CanvasJSChart 
                options = {options}
                        onRef={ref => this.chart = ref}
                />
            </div>            
            <br/>
            </>
            
        );
    }
}

export default Query3;
