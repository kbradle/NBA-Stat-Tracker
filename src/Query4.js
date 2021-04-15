import React from "react";
import { Link } from "react-router-dom";
import { CanvasJSChart } from "canvasjs-react-charts";

// 2 teams as input --- X --- DONE (JAKE)
// option to compare against avg(rest of league) --- X
// group by month --- X
// edit start/end dates --- X

var team1h = [];
var team1a = [];
var team2h = [];
var team2a = [];
var others = [];

function test(firstTeam, secondTeam, groupBy, allOthers, startDate, endDate) {
  team1h.length = 0;
  team1a.length = 0;
  team2h.length = 0;
  team2a.length = 0;
  others.length = 0;


  let xhrteam1h = new XMLHttpRequest();
  xhrteam1h.open("POST", "http://localhost:8080");
  xhrteam1h.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );

  let xhrteam1a = new XMLHttpRequest();
  xhrteam1a.open("POST", "http://localhost:8080");
  xhrteam1a.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );

  let xhrteam2h = new XMLHttpRequest();
  xhrteam2h.open("POST", "http://localhost:8080");
  xhrteam2h.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );

  let xhrteam2a = new XMLHttpRequest();
  xhrteam2a.open("POST", "http://localhost:8080");
  xhrteam2a.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );

  let monthOrYear1;
  let monthOrYear2;
  let monthOrYear3;
  let monthOrYear4;

  if (groupBy === "month") {
    monthOrYear1 = ", homeMonth";
    monthOrYear2 = ", Extract(month from Game_date) as homeMonth";
    monthOrYear3 = ", Extract(month from Game_date)";
    monthOrYear4 = ", Extract(month from Game_date) as Month";
  } else {
    monthOrYear1 = "";
    monthOrYear2 = "";
    monthOrYear3 = "";
    monthOrYear4 = "";
  }

  //team1 queries
  var data =
      "query= SELECT HomeWins/(AwayWins + HomeWins) as WinPct, HomeYear"+monthOrYear1+" FROM (Select Count(*) AS homeWins, Extract(year from Game_Date) as homeYear"+monthOrYear2+" " +
      "from JAWATSON.games games, JAWATSON.teams teams " +
      "where games.home_team_id = teams.team_id and team_name ='" +
      firstTeam +
      "' and games.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD') and Home_Points > Away_Points Group By Extract(year from Game_date)"+monthOrYear3+"), " +
      "(Select Count(*) AS awayWins, Extract(year from Game_Date) as awayYear"+monthOrYear4+" " +
      "from JAWATSON.games games, JAWATSON.teams teams " +
      "where games.home_team_id = teams.team_id and team_name ='" +
      firstTeam +
      "' and (games.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD') and Home_Points < Away_Points) Group By Extract(year from Game_date)"+monthOrYear3+") " +
      "WHERE homeYear = AwayYear Order By HomeYear"+monthOrYear1+" asc";
    data = data.replaceAll("+", "%2B");
    xhrteam1h.send(data);

  var temp =
    "query= SELECT HomeWins/(AwayWins + HomeWins) as WinPct, HomeYear"+monthOrYear1+" FROM (Select Count(*) AS homeWins, Extract(year from Game_Date) as homeYear"+monthOrYear2+" " +
    "from JAWATSON.games games, JAWATSON.teams teams " +
    "where games.visitor_team_id = teams.team_id and team_name ='" +
    firstTeam +
    "' and games.game_date >= to_date('" +
    startDate +
    "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
    endDate +
    "', 'YYYY-MM-DD') and Home_Points > Away_Points Group By Extract(year from Game_date)"+monthOrYear3+"), " +
    "(Select Count(*) AS awayWins, Extract(year from Game_Date) as awayYear"+monthOrYear4+" " +
    "from JAWATSON.games games, JAWATSON.teams teams " +
    "where games.visitor_team_id = teams.team_id and team_name ='" +
    firstTeam +
    "' and (games.game_date >= to_date('" +
    startDate +
    "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
    endDate +
    "', 'YYYY-MM-DD') and Home_Points < Away_Points) Group By Extract(year from Game_date)"+monthOrYear3+") " +
    "WHERE homeYear = AwayYear Order By HomeYear"+monthOrYear1+" asc";
  temp = temp.replaceAll("+", "%2B");
  xhrteam1a.send(temp);


  //team2 queries
  var data2 =
      "query= SELECT HomeWins/(AwayWins + HomeWins) as WinPct, HomeYear"+monthOrYear1+" FROM (Select Count(*) AS homeWins, Extract(year from Game_Date) as homeYear"+monthOrYear2+" " +
      "from JAWATSON.games games, JAWATSON.teams teams " +
      "where games.home_team_id = teams.team_id and team_name ='" +
      secondTeam +
      "' and games.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD') and Home_Points > Away_Points Group By Extract(year from Game_date)"+monthOrYear3+"), " +
      "(Select Count(*) AS awayWins, Extract(year from Game_Date) as awayYear"+monthOrYear4+" " +
      "from JAWATSON.games games, JAWATSON.teams teams " +
      "where games.home_team_id = teams.team_id and team_name ='" +
      secondTeam +
      "' and (games.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD') and Home_Points < Away_Points) Group By Extract(year from Game_date)"+monthOrYear3+") " +
      "WHERE homeYear = AwayYear Order By HomeYear"+monthOrYear1+" asc";
    data2 = data2.replaceAll("+", "%2B");
    xhrteam2h.send(data2);

  var temp2 =
    "query= SELECT HomeWins/(AwayWins + HomeWins) as WinPct, HomeYear"+monthOrYear1+" FROM (Select Count(*) AS homeWins, Extract(year from Game_Date) as homeYear"+monthOrYear2+" " +
    "from JAWATSON.games games, JAWATSON.teams teams " +
    "where games.visitor_team_id = teams.team_id and team_name ='" +
    secondTeam +
    "' and games.game_date >= to_date('" +
    startDate +
    "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
    endDate +
    "', 'YYYY-MM-DD') and Home_Points > Away_Points Group By Extract(year from Game_date)"+monthOrYear3+"), " +
    "(Select Count(*) AS awayWins, Extract(year from Game_Date) as awayYear"+monthOrYear4+" " +
    "from JAWATSON.games games, JAWATSON.teams teams " +
    "where games.visitor_team_id = teams.team_id and team_name ='" +
    secondTeam +
    "' and (games.game_date >= to_date('" +
    startDate +
    "', 'YYYY-MM-DD') and games.game_date <= to_date('" +
    endDate +
    "', 'YYYY-MM-DD') and Home_Points < Away_Points) Group By Extract(year from Game_date)"+monthOrYear3+") " +
    "WHERE homeYear = AwayYear Order By HomeYear"+monthOrYear1+" asc";
  temp2 = temp2.replaceAll("+", "%2B");
  xhrteam2a.send(temp2);

  // called after the response is received
  xhrteam1h.onload = function () {
    if (xhrteam1h.status !== 200) {
      alert(`Error ${xhrteam1h.status}: ${xhrteam1h.statusText}`);
    } else {
      //var div = document.createElement("div");
      var obj = JSON.parse(xhrteam1h.responseText);
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
          team1h.push({
            y: obj.message.rows[i][0],
            x: new Date(obj.message.rows[i][1], obj.message.rows[i][2]),
          });
        }
      } else {
        for (i = 0; i < obj.message.rows.length; i++) {
          team1h.push({
            y: obj.message.rows[i][0],
            x: new Date(obj.message.rows[i][1], 0),
          });
        }
      }
    }
  };

  xhrteam1a.onload = function () {
    if (xhrteam1a.status !== 200) {
      alert(`Error ${xhrteam1a.status}: ${xhrteam1a.statusText}`);
    } else {
      var obj = JSON.parse(xhrteam1a.responseText);
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
          team1a.push({
            y: obj.message.rows[i][0],
            x: new Date(obj.message.rows[i][1], obj.message.rows[i][2]),
          });
        }
      } else {
        for (i = 0; i < obj.message.rows.length; i++) {
          team1a.push({
            y: obj.message.rows[i][0],
            x: new Date(obj.message.rows[i][1], 0),
          });
        }
      }
    }
  };

  xhrteam2h.onload = function () {
    if (xhrteam2h.status !== 200) {
      alert(`Error ${xhrteam2h.status}: ${xhrteam2h.statusText}`);
    } else {
      var obj = JSON.parse(xhrteam2h.responseText);
      if (groupBy === "month") {
        for (var i = 0; i < obj.message.rows.length; i++) {
          team2h.push({
            y: obj.message.rows[i][0],
            x: new Date(obj.message.rows[i][1], obj.message.rows[i][2]),
          });
        }
      } else {
        for (i = 0; i < obj.message.rows.length; i++) {
          team2h.push({
            y: obj.message.rows[i][0],
            x: new Date(obj.message.rows[i][1], 0),
          });
        }
      }
    }
  };

  xhrteam2a.onload = function () {
    if (xhrteam2a.status !== 200) {
      alert(`Error ${xhrteam2a.status}: ${xhrteam2a.statusText}`);
    } else {
      var obj = JSON.parse(xhrteam2a.responseText);
      if (groupBy === "month") {
        for (var i = 0; i < obj.message.rows.length; i++) {
          team2a.push({
            y: obj.message.rows[i][0],
            x: new Date(obj.message.rows[i][1], obj.message.rows[i][2]),
          });
        }
      } else {
        for (i = 0; i < obj.message.rows.length; i++) {
          team2a.push({
            y: obj.message.rows[i][0],
            x: new Date(obj.message.rows[i][1], 0),
          });
        }
      }
    }
  };

  xhrteam1h.onprogress = function (event) {
    if (!event.lengthComputable) {
      alert(`Received ${event.loaded} bytes`);
    }
  };

  xhrteam1h.onerror = function () {
    alert("Request failed");
  };
}

class Query4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTeam: "",
      secondTeam: "",
      groupBy: "year",
      startDate: "",
      endDate: "",
      team1hName: "",
      team1aName: "",
    };
    this.updateChart = this.updateChart.bind(this);
    this.chart = "";
  }
  mySubmitHandler = (event) => {
    this.setState({ team1hName: this.state.firstTeam });
    this.setState({ team2hName: this.state.secondTeam });
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
  ChangeSecond = (event) => {
    this.setState({ secondTeam: event.target.value });
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
          name: this.state.team1hName + " Home Win%",
          showInLegend: true,
          markerType: "circle",
          dataPoints: team1h,
        },
        {
          type: "spline",
          name: this.state.team1hName + " Away Win%",
          showInLegend: true,
          markerType: "circle",
          dataPoints: team1a,
        },
        {
          type: "spline",
          name: this.state.team2hName + " Home Win%",
          showInLegend: true,
          markerType: "square",
          dataPoints: team2h,
        },
        {
          type: "spline",
          name: this.state.team2hName + " Away Win%",
          showInLegend: true,
          markerType: "square",
          dataPoints: team2a,
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
        <h1>Determining Home Field Advantages Between Teams</h1>
        <form onSubmit={this.mySubmitHandler}>
          Team 1:
          <select value={this.props.firstTeam} onChange={this.ChangeFirst} required>
            <option value="">First Team</option>
            {teams.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <br />
          Team 2:
          <select value={this.props.secondTeam} onChange={this.ChangeSecond}>
            <option value="">Second Team</option>
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
