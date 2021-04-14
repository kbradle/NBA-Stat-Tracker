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
  xhr.open("POST", "http://localhost:8080");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  let xhrTeam2 = new XMLHttpRequest();
  xhrAll.open("POST", "http://localhost:8080");
  xhrAll.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  if (groupBy === "month") {
    var data =
      'query= select t.team_name, sum(d.threepoints_attempted) as "3PTA",  Extract(year from g.game_date)as gyear, Extract(month from g.game_date)as gmonth from jawatson.games_details d, jawatson.teams t, JAWATSON.games g where d.team_id = t.team_id and g.game_id = d.game_id and (t.team_name = \'' +
      firstTeam +
      "' or t.team_name = '" +
      secondTeam +
      "') and (g.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and g.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD')) group by t.team_name, Extract(year from g.game_date), Extract(month from g.game_date) order by Extract(year from g.game_date), Extract(month from g.game_date) asc";
    xhrTeam1.send(data);

    if (allOthers === "true") {
      var count = 0;
      if (firstTeam !== undefined) count++;
      if (secondTeam !== undefined) count++;
      var temp =
        "query= select sum(d.threepoints_attempted)/" +
        (30 - count) +
        ' as "3PTA", Extract(year from g.game_date)as gyear, Extract(month from g.game_date)as gmonth from jawatson.games_details d, jawatson.teams t, JAWATSON.games g where d.team_id = t.team_id and g.game_id = d.game_id and t.team_name != \'' +
        firstTeam +
        "' and t.team_name != '" +
        secondTeam +
        "' and (g.game_date >= to_date('" +
        startDate +
        "', 'YYYY-MM-DD') and g.game_date <= to_date('" +
        endDate +
        "', 'YYYY-MM-DD')) group by Extract(year from g.game_date), Extract(month from g.game_date) order by Extract(year from g.game_date), Extract(month from g.game_date) asc";
      xhrTeam2.send(temp);
    }
  } else {
    var data1 =
      'query= select t.team_name, sum(d.threepoints_attempted) as "3PTA",  Extract(year from g.game_date)as gyear from jawatson.games_details d, jawatson.teams t, JAWATSON.games g where d.team_id = t.team_id and g.game_id = d.game_id and (t.team_name = \'' +
      firstTeam +
      "' or t.team_name = '" +
      secondTeam +
      "') and (g.game_date >= to_date('" +
      startDate +
      "', 'YYYY-MM-DD') and g.game_date <= to_date('" +
      endDate +
      "', 'YYYY-MM-DD')) group by t.team_name, Extract(year from g.game_date) order by Extract(year from g.game_date) asc";
    xhrTeam1.send(data1);

    if (allOthers === "true") {
      var count1 = 0;
      if (firstTeam !== undefined) count1++;
      if (secondTeam !== undefined) count1++;
      var temp1 =
        "query= select sum(d.threepoints_attempted)/" +
        (30 - count1) +
        ' as "3PTA", Extract(year from g.game_date)as gyear from jawatson.games_details d, jawatson.teams t, JAWATSON.games g where d.team_id = t.team_id and g.game_id = d.game_id and t.team_name != \'' +
        firstTeam +
        "' and t.team_name != '" +
        secondTeam +
        "' and (g.game_date >= to_date('" +
        startDate +
        "', 'YYYY-MM-DD') and g.game_date <= to_date('" +
        endDate +
        "', 'YYYY-MM-DD')) group by Extract(year from g.game_date) order by Extract(year from g.game_date) asc";
      xhrTeam2.send(temp1);
    }
  }

  // called after the response is received
  xhr.onload = function () {
    if (xhr.status !== 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      //var div = document.createElement("div");
      var obj = JSON.parse(xhr.responseText);
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
          if (obj.message.rows[i][0] === firstTeam) {
            team1.push({
              y: obj.message.rows[i][1],
              label:
                monthNames[obj.message.rows[i][3] - 1] +
                " " +
                obj.message.rows[i][2],
            });
          } else {
            team2.push({
              y: obj.message.rows[i][1],
              label:
                monthNames[obj.message.rows[i][3] - 1] +
                " " +
                obj.message.rows[i][2],
            });
          }
        }
      } else {
        for (i = 0; i < obj.message.rows.length; i++) {
          if (obj.message.rows[i][0] === firstTeam) {
            team1.push({
              y: obj.message.rows[i][1],
              label: obj.message.rows[i][2],
            });
          } else {
            team2.push({
              y: obj.message.rows[i][1],
              label: obj.message.rows[i][2],
            });
          }
        }
      }
    }
  };

  xhrAll.onload = function () {
    if (xhrAll.status !== 200) {
      alert(`Error ${xhrAll.status}: ${xhrAll.statusText}`);
    } else {
      var obj = JSON.parse(xhrAll.responseText);
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
          others.push({
            y: obj.message.rows[i][0],
            label:
              monthNames[obj.message.rows[i][2] - 1] +
              " " +
              obj.message.rows[i][1],
          });
        }
      } else {
        for (i = 0; i < obj.message.rows.length; i++) {
          others.push({
            y: obj.message.rows[i][0],
            label: obj.message.rows[i][1],
          });
        }
      }
    }
  };

  xhr.onprogress = function (event) {
    if (!event.lengthComputable) {
      alert(`Received ${event.loaded} bytes`);
    }
  };

  xhr.onerror = function () {
    alert("Request failed");
  };
}

class Query4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTeam: "",
      secondTeam: "",
      allOthers: "",
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
  ChangeSecond = (event) => {
    this.setState({ secondTeam: event.target.value });
  };
  ChangeOption = (event) => {
    this.setState({ groupBy: event.target.value });
  };
  ChangeAll = (event) => {
    this.setState({ allOthers: event.target.value });
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
        text: "Three Point Attemps",
      },
      axisY: {
        title: "Number of Three Pointers Attempted",
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "spline",
          name: this.state.team1Name,
          showInLegend: true,
          dataPoints: team1,
        },
        {
          type: "spline",
          name: this.state.team2Name,
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
          <select onChange={this.ChangeSecond} required>
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
          <div>
            <input
              type="radio"
              value="true"
              checked={this.state.allOthers === "true"}
              onChange={this.ChangeAll}
            />
            All Other Teams On
            <input
              type="radio"
              value="false"
              checked={this.state.allOthers === "false"}
              onChange={this.ChangeAll}
            />
            All Other Teams Off
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
