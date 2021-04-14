import React from 'react';
import {Link} from 'react-router-dom'
import {CanvasJSChart} from 'canvasjs-react-charts'

// 2 teams as input --- X
// option to compare against avg(rest of league) --- X
// group by month --- X
// edit start/end dates --- X

 
var team1=[];
var team2=[];
var others=[];
var stat=[];

function test(firstTeam, secondTeam, groupBy, startDate, endDate){
    team1.length=0;
    team2.length=0;
    others.length=0;
    stat.length=0;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  


    if(groupBy==='month' && groupBy==='regular'){        
        var data = "query= select t.team_name, avg(g.home_points) as \"REG_HOME_POINTS\", avg(g.home_fieldgoal_percentage) as \"REG_HOME_FIELDGOAL_PERCENTAGE\", avg(g.home_freethrow_percentage) as \"REG_HOME_FFREETHROW_PERCENTAGE\", avg(g.home_3point_percentage) as \"REG_HOME_3POINT_PERCENTAGE\", avg(g.home_assists) as \"REG_HOME_ASSISTS\",  avg(g.home_rebounds) as \"REG_HOME_REBOUNDS\", avg(g.away_points) as \"REG_AWAY_POINTS\", avg(g.away_fieldgoal_percentage) as \"REG_AWAY_FIELDGOAL_PERCENTAGE\", avg(g.away_freethrow_percentage) as \"REG_AWAY_FFREETHROW_PERCENTAGE\", avg(g.away_3point_percentage) as \"REG_AWAY_3POINT_PERCENTAGE\", avg(g.away_assists) as \"REG_AWAY_ASSISTS\", avg(g.away_rebounds) as \"REG_AWAY_REBOUNDS\", avg(g.home_team_wins_bool) as \"REG_HOME_TEAM_WINS_BOOL\",  Extract(year from g.game_date) as GAMES_YEAR, Extract(month from g.game_date) as GAMES_MONTH  from jawatson.teams t, JAWATSON.games g, jawatson.games_details gd  where gd.team_id = t.team_id and g.game_id = gd.game_id and g.playoff_indicator = 2 and (t.team_name = '"+firstTeam +"' or t.team_name = '"+secondTeam+"') and (g.game_date >= to_date('"+startDate+"', 'YYYY-MM-DD') and   g.game_date <= to_date('"+endDate+"', 'YYYY-MM-DD')) group by Extract(year from g.game_date), Extract(month from g.game_date), t.team_name order by Extract(year from g.game_date), Extract(month from g.game_date) asc";
        xhr.send(data);

    }
    if(groupBy==='year' && groupBy==='regular'){  

        var data2 = "query= select t.team_name, avg(g.home_points) as \"REG_HOME_POINTS\", avg(g.home_fieldgoal_percentage) as \"REG_HOME_FIELDGOAL_PERCENTAGE\", avg(g.home_freethrow_percentage) as \"REG_HOME_FFREETHROW_PERCENTAGE\",   avg(g.home_3point_percentage) as \"REG_HOME_3POINT_PERCENTAGE\", avg(g.home_assists) as \"REG_HOME_ASSISTS\",  avg(g.home_rebounds) as \"REG_HOME_REBOUNDS\", avg(g.away_points) as \"REG_AWAY_POINTS\",  avg(g.away_fieldgoal_percentage) as \"REG_AWAY_FIELDGOAL_PERCENTAGE\", avg(g.away_freethrow_percentage) as \"REG_AWAY_FFREETHROW_PERCENTAGE\", avg(g.away_3point_percentage) as \"REG_AWAY_3POINT_PERCENTAGE\",    avg(g.away_assists) as \"REG_AWAY_ASSISTS\", avg(g.away_rebounds) as \"REG_AWAY_REBOUNDS\", avg(g.home_team_wins_bool) as \"REG_HOME_TEAM_WINS_BOOL\", Extract(year from g.game_date) as GAMES_YEAR  from jawatson.teams t, JAWATSON.games g, jawatson.games_details gd    where gd.team_id = t.team_id and g.game_id = gd.game_id and g.playoff_indicator = 2 and (t.team_name = '"+firstTeam +"' or t.team_name = '"+secondTeam+"') and (g.game_date >= to_date('"+startDate+"', 'YYYY-MM-DD') and  g.game_date <= to_date('"+endDate+"', 'YYYY-MM-DD')) group by Extract(year from g.game_date), t.team_name order by Extract(year from g.game_date) asc";
        xhr.send(data2);
    }

    if(groupBy==='month' && groupBy==='playoff') {  

        var data3 = "query= select t.team_name, avg(g.home_points) as \"PLAYOFFS_HOME_POINTS\", avg(g.home_fieldgoal_percentage) as \"PLAYOFFS_HOME_FIELDGOAL_PERCENTAGE\", avg(g.home_freethrow_percentage) as \"PLAYOFFS_HOME_FFREETHROW_PERCENTAGE\",  avg(g.home_3point_percentage) as \"PLAYOFFS_HOME_3POINT_PERCENTAGE\", avg(g.home_assists) as \"PLAYOFFS_HOME_ASSISTS\",  avg(g.home_rebounds) as \"PLAYOFFS_HOME_REBOUNDS\", avg(g.away_points) as \"PLAYOFFS_AWAY_POINTS\",  avg(g.away_fieldgoal_percentage) as \"PLAYOFFS_AWAY_FIELDGOAL_PERCENTAGE\", avg(g.away_freethrow_percentage) as \"PLAYOFFS_AWAY_FFREETHROW_PERCENTAGE\", avg(g.away_3point_percentage) as \"PLAYOFFS_AWAY_3POINT_PERCENTAGE\",  avg(g.away_assists) as \"PLAYOFFS_AWAY_ASSISTS\", avg(g.away_rebounds) as \"PLAYOFFS_AWAY_REBOUNDS\", avg(g.home_team_wins_bool) as \"PLAYOFFS_HOME_TEAM_WINS_BOOL\",  Extract(year from g.game_date) as GAMES_YEAR, Extract(month from g.game_date) as GAMES_MONTH  from jawatson.teams t, JAWATSON.games g, jawatson.games_details gd where gd.team_id = t.team_id and g.game_id = gd.game_id and g.playoff_indicator = 4 and(t.team_name = '"+firstTeam +"' or t.team_name = '"+secondTeam+"') and (g.game_date >= to_date('"+startDate+"', 'YYYY-MM-DD') and   g.game_date <= to_date('"+endDate+"', 'YYYY-MM-DD')) group by Extract(year from g.game_date), Extract(month from g.game_date), t.team_name order by Extract(year from g.game_date), Extract(month from g.game_date) asc";
        xhr.send(data3);
    }
    if(groupBy==='year' && groupBy==='playoff'){        
        var data4 = "query= select t.team_name, avg(g.home_points) as \"PLAYOFFS_HOME_POINTS\", avg(g.home_fieldgoal_percentage) as \"PLAYOFFS_HOME_FIELDGOAL_PERCENTAGE\", avg(g.home_freethrow_percentage) as \"PLAYOFFS_HOME_FFREETHROW_PERCENTAGE\", avg(g.home_3point_percentage) as \"PLAYOFFS_HOME_3POINT_PERCENTAGE\", avg(g.home_assists) as \"PLAYOFFS_HOME_ASSISTS\",  avg(g.home_rebounds) as \"PLAYOFFS_HOME_REBOUNDS\", avg(g.away_points) as \"PLAYOFFS_AWAY_POINTS\",   avg(g.away_fieldgoal_percentage) as \"PLAYOFFS_AWAY_FIELDGOAL_PERCENTAGE\", avg(g.away_freethrow_percentage) as \"PLAYOFFS_AWAY_FFREETHROW_PERCENTAGE\", avg(g.away_3point_percentage) as \"PLAYOFFS_AWAY_3POINT_PERCENTAGE\",  avg(g.away_assists) as \"PLAYOFFS_AWAY_ASSISTS\", avg(g.away_rebounds) as \"PLAYOFFS_AWAY_REBOUNDS\", avg(g.home_team_wins_bool) as \"PLAYOFFS_HOME_TEAM_WINS_BOOL\",   Extract(year from g.game_date) as GAMES_YEAR   from jawatson.teams t, JAWATSON.games g, jawatson.games_details gd  where gd.team_id = t.team_id and g.game_id = gd.game_id and g.playoff_indicator = 4 and t.team_name = 'Toronto Raptors'group by Extract(year from g.game_date), t.team_name order by Extract(year from g.game_date) asc";
        xhr.send(data4);
     }
    
    // called after the response is received
    xhr.onload = function() {
        if (xhr.status !== 200) { 
            alert(`Error ${xhr.status}: ${xhr.statusText}`); 
        } else { 
            var div = document.createElement("div");
            var obj = JSON.parse(xhr.responseText);
            div.innerHTML = xhr.responseText;
             document.body.appendChild(div);
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
          
            if(groupBy==='month' && groupBy==='regular') {

                for(var i=0; i<obj.message.rows.length;i++){

                   
                    if(obj.message.rows[i][0]===firstTeam){
                       
                        switch(stat) {
                            
                            case "REG_HOME_POINTS": {
                                team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }

                            case "REG_HOME_FIELDGOAL_PERCENTAGE": {
                                team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }

                            case "REG_HOME_FFREETHROW_PERCENTAGE": {
                                team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break; 
                            }

                            case "REG_HOME_3POINT_PERCENTAGE": {
                                team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }

                            case "REG_HOME_ASSISTS": {
                                team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break; 
                            }
                            
                            case "REG_HOME_REBOUNDS": {
                                team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;    
                            }
                           
                            default: {
                                break; 
                            }
                        }

                      //  team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});

                        
                    }
                    else{

                        switch(stat) {

                            case "REG_AWAY_POINTS":  {
                                team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }

                            case "REG_AWAY_FIELDGOAL_PERCENTAGE":  {
                                team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }

                            case "REG_AWAY_FFREETHROW_PERCENTAGE":  {
                                team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }
                            case "REG_AWAY_3POINT_PERCENTAGE":  {
                                team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }
                           
                            case "REG_AWAY_ASSISTS":  {
                                team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }

                            case "REG_AWAY_REBOUNDS":  {
                                team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }
                           
                            default: {
                                break;
                            }
                        }
                       // team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                    }
                }   
            }
            if(groupBy==='month' && groupBy==='playoff') {
                for(var i=0; i<obj.message.rows.length;i++){
                    if(obj.message.rows[i][0]===firstTeam){

                        switch(stat) {
                            
                            case "PLAYOFFS_HOME_POINTS": {
                                team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }

                            case "PLAYOFFS_HOME_FIELDGOAL_PERCENTAGE": {
                                team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }

                            case "PLAYOFFS_HOME_FFREETHROW_PERCENTAGE": {
                                team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break; 
                            }

                            case "PLAYOFFS_HOME_3POINT_PERCENTAGE": {
                                team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }

                            case "PLAYOFFS_HOME_ASSISTS": {
                                team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break; 
                            }
                            
                            case "PLAYOFFS_HOME_REBOUNDS": {
                                team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;    
                            }
                           
                            default: {
                                break; 
                            }
                        }

                       // team1.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                    }
                    else{

                        switch(stat) {

                            case "PLAYOFFS_AWAY_POINTS":  {
                                team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }

                            case "PLAYOFFS_AWAY_FIELDGOAL_PERCENTAGE":  {
                                team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }

                            case "PLAYOFFS_AWAY_FFREETHROW_PERCENTAGE":  {
                                team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }
                            case "PLAYOFFS_AWAY_3POINT_PERCENTAGE":  {
                                team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }
                          
                            case "PLAYOFFS_AWAY_ASSISTS":  {
                                team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }

                            case "PLAYOFFS_AWAY_REBOUNDS":  {
                                team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                                break;
                            }
                           
                            default: {
                                break;
                            }
                        }

                      //  team2.push({y: obj.message.rows[i][1], label: monthNames[obj.message.rows[i][3]-1] + ' '+ obj.message.rows[i][2]});
                    }
                }   
            }
            if(groupBy==='year' && groupBy==='regular') {  
                for(i=0; i<obj.message.rows.length;i++){
                    if(obj.message.rows[i][0]===firstTeam){

                        switch(stat) {
                            
                            case "REG_HOME_POINTS": {
                                team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }

                            case "REG_HOME_FIELDGOAL_PERCENTAGE": {
                                team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }

                            case "REG_HOME_FFREETHROW_PERCENTAGE": {
                                team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break; 
                            }

                            case "REG_HOME_3POINT_PERCENTAGE": {
                                team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }

                            case "REG_HOME_ASSISTS": {
                                team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break; 
                            }
                            
                            case "REG_HOME_REBOUNDS": {
                                team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;    
                            }
                           
                            default: {
                                break; 
                            }
                        }
                      //  team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                    }
                    else{
                        switch(stat) {

                            case "REG_AWAY_POINTS":  {
                                team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }

                            case "REG_AWAY_FIELDGOAL_PERCENTAGE":  {
                                team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }

                            case "REG_AWAY_FFREETHROW_PERCENTAGE":  {
                                team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }
                            case "REG_AWAY_3POINT_PERCENTAGE":  {
                                team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }
                           
                            case "REG_AWAY_ASSISTS":  {
                                team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }

                            case "REG_AWAY_REBOUNDS":  {
                                team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }
                           
                            default: {
                                break;
                            }
                        }
                      //  team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                    }
                }    
            }

            if(groupBy==='year' && groupBy==='playoff') {  
                for(i=0; i<obj.message.rows.length;i++){
                    if(obj.message.rows[i][0]===firstTeam){
                        switch(stat) {
                            
                            case "PLAYOFFS_HOME_POINTS": {
                                team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }

                            case "PLAYOFFS_HOME_FIELDGOAL_PERCENTAGE": {
                                team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }

                            case "PLAYOFFS_HOME_FFREETHROW_PERCENTAGE": {
                                team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break; 
                            }

                            case "PLAYOFFS_HOME_3POINT_PERCENTAGE": {
                                team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }

                            case "PLAYOFFS_HOME_ASSISTS": {
                                team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break; 
                            }
                            
                            case "PLAYOFFS_HOME_REBOUNDS": {
                                team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;    
                            }
                           
                            default: {
                                break; 
                            }
                        }
                       // team1.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                    }
                    else{

                        switch(stat) {

                            case "PLAYOFFS_AWAY_POINTS":  {
                                team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }

                            case "PLAYOFFS_AWAY_FIELDGOAL_PERCENTAGE":  {
                                team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }

                            case "PLAYOFFS_AWAY_FFREETHROW_PERCENTAGE":  {
                                team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }
                            case "PLAYOFFS_AWAY_3POINT_PERCENTAGE":  {
                                team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }
                          
                            case "PLAYOFFS_AWAY_ASSISTS":  {
                                team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }

                            case "PLAYOFFS_AWAY_REBOUNDS":  {
                                team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
                                break;
                            }
                           
                            default: {
                                break;
                            }
                        }
                       // team2.push({y: obj.message.rows[i][1], label: obj.message.rows[i][2]});
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
        this.state = { firstTeam: '', secondTeam: '', groupBy: '', startDate:'', endDate:'', team1Name:'', team2Name:''};
        this.updateChart = this.updateChart.bind(this);
        this.chart = '';
    }
    mySubmitHandler = (event) => {
        this.setState({team1Name: this.state.firstTeam});
        this.setState({team2Name: this.state.secondTeam});
        event.preventDefault();
        test(this.state.firstTeam, this.state.secondTeam, this.state.groupBy, this.state.startDate, this.state.endDate);
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
   
    ChangeStartDate = (event) => {
        this.setState({startDate: event.target.value});
    }
    ChangeEndDate = (event) => {
        this.setState({endDate: event.target.value});
    }
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
                text: "Three Point Attemps"
            },
            axisY : {
                title: "Number of Three Pointers Attempted"
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
            },
            {
                type: "spline",
                name: 'Avg. All Other Teams',
                showInLegend: true,
                dataPoints: others
            }]
        }
        const teams = ['Atlanta Hawks', 'Boston Celtics','Brooklyn Nets',  'Charlotte Hornets','Chicago Bulls','Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets','Detroit Pistons', 'Golden State Warriors','Houston Rockets',
        'Indiana Pacers', 'Los Angeles Clippers', 'Los Angeles Lakers','Memphis Grizzlies','Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks', 'Orlando Magic',
        'Oklahoma City Thunder', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings','San Antonio Spurs','Toronto Raptors','Utah Jazz','Washington Wizards'];



        return(
            <>
            <h1>Compare Regular Season and Playoff Games Stats</h1>
            <form onSubmit={this.mySubmitHandler}>
                <select onChange={this.ChangeFirst} required>
                    <option value=""  >Home Team</option>
                    {teams.map(c => <option key={c}>{c}</option>)}
                </select>
                <select onChange={this.ChangeSecond} required>
                    <option value=""  >Away Team</option>
                    {teams.map(c => <option key={c}>{c}</option>)}
                </select>
                <select onChange={this.Change} required>
                    <option value=""  >Select Stat</option>
                    {teams.map(c => <option key={c}>{c}</option>)}
                </select>
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
                    <input type="radio" value="regular" checked={this.state.groupBy === 'regular'} onChange={this.ChangeOption}/>regular               
                    <input type="radio" value="playoff" checked={this.state.groupBy === 'playoff'} onChange={this.ChangeOption}/>playoff           
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
