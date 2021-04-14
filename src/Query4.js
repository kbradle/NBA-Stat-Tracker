import React from "react";
import { Link } from "react-router-dom";
import { CanvasJSChart } from "canvasjs-react-charts";

// 2 teams as input --- X
// option to compare against avg(rest of league) --- X
// group by month --- X
// edit start/end dates --- X

var team1 = [];
var team2 = [];
var others = [];

function test(firstTeam, secondTeam, groupBy, allOthers, startDate, endDate) {
  team1.length = 0;
  team2.length = 0;
  others.length = 0;

  let xhrTeam1 = new XMLHttpRequest();
  xhrTeam1.open("POST", "http://localhost:8080");
  xhrTeam1.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );

  let xhrTeam2 = new XMLHttpRequest();
  xhrTeam2.open("POST", "http://localhost:8080");
  xhrTeam2.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );

  if (groupBy === "month") {
    var data =
      "query= SELECT HomeWins/(AwayWins + HomeWins) as WinPct, HomeYear, homeMonth FROM (Select Count(*) AS homeWins, Extract(year from Game_Date) as homeYear, Extract(month from Game_date) as homeMonth " +
      "from JAWATSON.games games, JAWATSON.teams teams " +
      "where games.home_team_id = teams.team_id and team_name ='" +
      firstTeam +
      "' and games.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD') and Home_Points > Away_Points Group By Extract(year from Game_date), Extract(month from Game_date)), " +
      "(Select Count(*) AS awayWins, Extract(year from Game_Date) as awayYear, Extract(month from Game_date) as Month " +
      "from JAWATSON.games games, JAWATSON.teams teams " +
      "where games.home_team_id = teams.team_id and team_name ='" +
      firstTeam +
      "' and (games.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD') and Home_Points < Away_Points) Group By Extract(year from Game_date), Extract(month from Game_date)) " +
      "WHERE homeYear = AwayYear Order By HomeYear, HomeMonth asc";
    data = data.replaceAll("+", "%2B");
    xhrTeam1.send(data);

    var temp =
      "query= SELECT HomeWins/(AwayWins + HomeWins) as WinPct, HomeYear, homeMonth FROM (Select Count(*) AS homeWins, Extract(year from Game_Date) as homeYear, Extract(month from Game_date) as homeMonth " +
      "from JAWATSON.games games, JAWATSON.teams teams " +
      "where games.visitor_team_id = teams.team_id and team_name ='" +
      firstTeam +
      "' and games.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD') and Home_Points > Away_Points Group By Extract(year from Game_date), Extract(month from Game_date)), " +
      "(Select Count(*) AS awayWins, Extract(year from Game_Date) as awayYear, Extract(month from Game_date) as Month " +
      "from JAWATSON.games games, JAWATSON.teams teams " +
      "where games.visitor_team_id = teams.team_id and team_name ='" +
      firstTeam +
      "' and (games.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD') and Home_Points < Away_Points) Group By Extract(year from Game_date), Extract(month from Game_date)) " +
      "WHERE homeYear = AwayYear Order By HomeYear, HomeMonth asc";
    temp = temp.replaceAll("+", "%2B");
    xhrTeam2.send(temp);
  } else {
    var data1 =
      "query= SELECT HomeWins/(AwayWins + HomeWins) as WinPct, HomeYear FROM (Select Count(*) AS homeWins, Extract(year from Game_Date) as homeYear " +
      "from JAWATSON.games games, JAWATSON.teams teams " +
      "where games.home_team_id = teams.team_id and team_name ='" +
      firstTeam +
      "' and games.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD') and Home_Points > Away_Points Group By Extract(year from Game_date)), " +
      "(Select Count(*) AS awayWins, Extract(year from Game_Date) as awayYear " +
      "from JAWATSON.games games, JAWATSON.teams teams " +
      "where games.home_team_id = teams.team_id and team_name ='" +
      firstTeam +
      "' and (games.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD') and Home_Points < Away_Points) Group By Extract(year from Game_date)) " +
      "WHERE homeYear = AwayYear Order By HomeYear asc";
    data1 = data1.replaceAll("+", "%2B");
    xhrTeam1.send(data1);

    var temp1 =
      "query= SELECT HomeWins/(AwayWins + HomeWins) as WinPct, HomeYear FROM (Select Count(*) AS homeWins, Extract(year from Game_Date) as homeYear " +
      "from JAWATSON.games games, JAWATSON.teams teams " +
      "where games.visitor_team_id = teams.team_id and team_name ='" +
      firstTeam +
      "' and games.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD') and Home_Points > Away_Points Group By Extract(year from Game_date)), " +
      "(Select Count(*) AS awayWins, Extract(year from Game_Date) as awayYear " +
      "from JAWATSON.games games, JAWATSON.teams teams " +
      "where games.visitor_team_id = teams.team_id and team_name ='" +
      firstTeam +
      "' and (games.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD') and Home_Points < Away_Points) Group By Extract(year from Game_date)) " +
      "WHERE homeYear = AwayYear Order By HomeYear asc";
    temp1 = temp1.replaceAll("+", "%2B");
    xhrTeam2.send(temp1);
  }

  // called after the response is received
  xhrTeam1.onload = function () {
    if (xhrTeam1.status !== 200) {
      alert(`Error ${xhrTeam1.status}: ${xhrTeam1.statusText}`);
    } else {
      //var div = document.createElement("div");
      var obj = JSON.parse(xhrTeam1.responseText);
      //div.innerHTML = xhr.responseText;
      // document.body.appendChild(div);
      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      if (groupBy === "month") {
        for (var i = 0; i < obj.message.rows.length; i++) {
          team1.push({
            y: obj.message.rows[i][0],
            x: new Date(obj.message.rows[i][1], obj.message.rows[i][2]),
          });
        }
      } else {
        for (i = 0; i < obj.message.rows.length; i++) {
          team1.push({
            y: obj.message.rows[i][0],
            x: new Date(obj.message.rows[i][1], 0),
          });
        }
      }
    }
  };

  xhrTeam2.onload = function () {
    if (xhrTeam2.status !== 200) {
      alert(`Error ${xhrTeam2.status}: ${xhrTeam2.statusText}`);
    } else {
      var obj = JSON.parse(xhrTeam2.responseText);
      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      if (groupBy === "month") {
        for (var i = 0; i < obj.message.rows.length; i++) {
          team2.push({
            y: obj.message.rows[i][0],
            x: new Date(obj.message.rows[i][1], obj.message.rows[i][2]),
          });
        }
      } else {
        for (i = 0; i < obj.message.rows.length; i++) {
          team2.push({
            y: obj.message.rows[i][0],
            x: new Date(obj.message.rows[i][1], 0),
          });
        }
      }
    }
  };

  xhrTeam1.onprogress = function (event) {
    if (!event.lengthComputable) {
      alert(`Received ${event.loaded} bytes`);
    }
  };

  xhrTeam1.onerror = function () {
    alert("Request failed");
  };
}

class Query4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTeam: "",
      secondTeam: "",
      groupBy: "",
      startDate: "",
      endDate: "",
      team1Name: "",
      team2Name: "",
    };
    this.updateChart = this.updateChart.bind(this);
    this.chart = "";
  }
  mySubmitHandler = (event) => {
    this.setState({ team1Name: this.state.firstTeam });
    this.setState({ team2Name: this.state.secondTeam });
    event.preventDefault();
    test(
      this.state.firstTeam,
      this.state.secondTeam,
      this.state.groupBy,
      this.state.allOthers,
      this.state.startDate,
      this.state.endDate
    );
    var x = document.getElementById("chart");
    x.hidden = false;
  };
  ChangeFirst = (event) => {
    this.setState({ firstTeam: event.target.value });
  };
  ChangeOption = (event) => {
    this.setState({ groupBy: event.target.value });
  };
  ChangeStartDate = (event) => {
    this.setState({ startDate: event.target.value });
  };
  ChangeEndDate = (event) => {
    this.setState({ endDate: event.target.value });
  };
  componentDidMount() {
    setInterval(this.updateChart);
  }
  updateChart() {
    if (this.chart) {
      this.chart.render();
    }
  }

  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Home Field Advantage",
      },
      axisY: {
        title: "Home Field Advantage vs Away Field Advantage",
      },
      axisX: {
        title: "Year",
        valueFormatString: "YYYY",
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "spline",
          name: this.state.team1Name + " Home Win%",
          showInLegend: true,
          dataPoints: team1,
        },
        {
          type: "spline",
          name: this.state.team1Name + " Away Win%",
          showInLegend: true,
          dataPoints: team2,
        },
        {
          type: "spline",
          name: "Avg. All Other Teams",
          showInLegend: true,
          dataPoints: others,
        },
      ],
    };
    const teams = [
      "Atlanta Hawks",
      "Boston Celtics",
      "Brooklyn Nets",
      "Charlotte Hornets",
      "Chicago Bulls",
      "Cleveland Cavaliers",
      "Dallas Mavericks",
      "Denver Nuggets",
      "Detroit Pistons",
      "Golden State Warriors",
      "Houston Rockets",
      "Indiana Pacers",
      "Los Angeles Clippers",
      "Los Angeles Lakers",
      "Memphis Grizzlies",
      "Miami Heat",
      "Milwaukee Bucks",
      "Minnesota Timberwolves",
      "New Orleans Pelicans",
      "New York Knicks",
      "Orlando Magic",
      "Oklahoma City Thunder",
      "Philadelphia 76ers",
      "Phoenix Suns",
      "Portland Trail Blazers",
      "Sacramento Kings",
      "San Antonio Spurs",
      "Toronto Raptors",
      "Utah Jazz",
      "Washington Wizards",
    ];

    return (
      <>
        <h1>Compare Three Point Attempts</h1>
        <form onSubmit={this.mySubmitHandler}>
          <select onChange={this.ChangeFirst} required>
            <option value="">First Team</option>
            {teams.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <br />
          <br />
          start date:{" "}
          <input type="date" onChange={this.ChangeStartDate} required /> <br />
          end date: <input type="date" onChange={this.ChangeEndDate} required />
          <br />
          <br />
          <div className="radio">
            <input
              type="radio"
              value="year"
              checked={this.state.groupBy === "year"}
              onChange={this.ChangeOption}
            />
            yearly
            <input
              type="radio"
              value="month"
              checked={this.state.groupBy === "month"}
              onChange={this.ChangeOption}
            />
            monthly
          </div>
          <input type="submit" />
        </form>
        <Link to="/">
          <button variant="outlined">Home</button>
        </Link>
        <br />
        <br />
        <div id="chart" hidden>
          <CanvasJSChart
            options={options}
            onRef={(ref) => (this.chart = ref)}
          />
        </div>
        <br />
      </>
    );
  }
}

export default Query4;
