import React from "react";
import { Link } from "react-router-dom";
import { CanvasJSChart } from "canvasjs-react-charts";

var p1 = [];
var p2 = [];

function titleCase(string) {
  if (string === "") {
    return string;
  }
  string = string.toLowerCase().split(' ');
  for (var i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
  }
  return string.join(' ');
}

function test(param) {
  p1.length = 0;
  p2.length = 0;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  var adjustedName1 = param.p1name.replaceAll("'", "''");
  var finalName1 = "UPPER('"+adjustedName1+"')";

  let monthOrYearString1;
  let monthOrYearString2;

  if(param.monthOrYear === "year") {
    monthOrYearString1 = "to_char(\"TRUNC(GAME_DATE,'YEAR')\",'YYYY-MM')";
    monthOrYearString2 = "Trunc(Game_Date, 'Year')";
  } else {
    monthOrYearString1 = "to_char(\"TRUNC(GAME_DATE,'MONTH')\",'YYYY-MM')";
    monthOrYearString2 = "Trunc(Game_Date, 'Month')";
  }

  let data;

  //if (param.p2name === "Other" || param.p2name === "other") {
  //  data = "query=SELECT Name, AVG(P36), " + monthOrYearString1 + " as \"Date\" FROM (SELECT jawatson.players.player_name AS Name, ((jawatson.games_details." + param.chosenStat + " / jawatson.games_details.seconds_played) * 2160) AS P36, " + monthOrYearString2 + " FROM jawatson.players, jawatson.games_details, jawatson.games WHERE jawatson.games_details.player_ID = jawatson.players.player_ID AND jawatson.games.game_ID = jawatson.games_details.game_ID AND (UPPER(jawatson.players.player_name) = " + finalName1 + ") AND jawatson.games_details.seconds_played != 0 UNION SELECT jawatson.players.player_name AS Name, ((jawatson.games_details." + param.chosenStat + " / jawatson.games_details.seconds_played) * 2160) AS P36, " + monthOrYearString2 + " FROM jawatson.players, jawatson.games_details, jawatson.games WHERE jawatson.games_details.player_ID = jawatson.players.player_ID AND jawatson.games.game_ID = jawatson.games_details.game_ID AND (UPPER(jawatson.players.player_name) != " + finalName1 + ") AND jawatson.games_details.seconds_played != 0) GROUP BY " + monthOrYearString1 + ", Name ORDER BY \"Date\" ASC";
  //} else {
    var adjustedName2 = param.p2name.replaceAll("'", "''");
    var finalName2 = "UPPER('"+adjustedName2+"')";
    data = "query=SELECT Name, AVG(P36), " + monthOrYearString1 + " as \"Date\" FROM (SELECT jawatson.players.player_name AS Name, ((jawatson.games_details." + param.chosenStat + " / jawatson.games_details.seconds_played) * 2160) AS P36, " + monthOrYearString2 + " FROM jawatson.players, jawatson.games_details, jawatson.games WHERE jawatson.games_details.player_ID = jawatson.players.player_ID AND jawatson.games.game_ID = jawatson.games_details.game_ID AND (UPPER(jawatson.players.player_name) = " + finalName1 + ") AND jawatson.games_details.seconds_played != 0 UNION SELECT jawatson.players.player_name AS Name, ((jawatson.games_details." + param.chosenStat + " / jawatson.games_details.seconds_played) * 2160) AS P36, " + monthOrYearString2 + " FROM jawatson.players, jawatson.games_details, jawatson.games WHERE jawatson.games_details.player_ID = jawatson.players.player_ID AND jawatson.games.game_ID = jawatson.games_details.game_ID AND (UPPER(jawatson.players.player_name) = " + finalName2 + ") AND jawatson.games_details.seconds_played != 0) GROUP BY " + monthOrYearString1 + ", Name ORDER BY \"Date\" ASC";
  //}

  //var data = "query=SELECT Name, P36, to_char(\"TRUNC(GAME_DATE,'MONTH')\",'YYYY-MM') as \"Date\" FROM (SELECT players.player_name AS Name, ((games_details." + param.chosenStat + " / games_details.seconds_played) * 2160) AS P36, Trunc(Game_Date, 'Month') FROM players, games_details, games WHERE games_details.player_ID = players.player_ID AND games.game_ID = games_details.game_ID AND (UPPER(players.player_name) = " + finalName1 + ") AND games_details.seconds_played != 0 UNION SELECT players.player_name AS Name, ((games_details." + param.chosenStat + " / games_details.seconds_played) * 2160) AS P36, Trunc(Game_Date, 'Month') FROM players, games_details, games WHERE games_details.player_ID = players.player_ID AND games.game_ID = games_details.game_ID AND (UPPER(players.player_name) = " + finalName2 + ") AND games_details.seconds_played != 0) ORDER BY \"Date\" ASC";


  //data = data.replaceAll("+", "%2B");
  xhr.send(data);

  // called after the response is received
  xhr.onload = function () {
    if (xhr.status !== 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      var div = document.createElement("div");
      var obj = JSON.parse(xhr.responseText);
      //div.innerHTML = xhr.responseText;
      // document.body.appendChild(div);

      for (var i = 0; i < obj.message.rows.length; i++) {
        if (obj.message.rows[i][0].toLowerCase() === param.p1name.toLowerCase()) {
          p1.push({ y: obj.message.rows[i][1], label: obj.message.rows[i][2] ,
          x: new Date(
            obj.message.rows[i][2].substring(0, 4),
            obj.message.rows[i][2].substring(5, 7)
          ),
        });
        } else {
          p2.push({ y: obj.message.rows[i][1], label: obj.message.rows[i][2] ,
          x: new Date(
            obj.message.rows[i][2].substring(0, 4),
            obj.message.rows[i][2].substring(5, 7)
          ),
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

class Query2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { p1name: "", p2name: "", chosenStat: "", monthOrYear: "year", p1ChartName: "", p2ChartName: "", statChartName: "",};
    this.updateChart = this.updateChart.bind(this);
    this.chart = "";
  }
  mySubmitHandler = (event) => {
    this.setState({p1ChartName: this.state.p1name});
    this.setState({p2ChartName: this.state.p2name});
    this.setState({statChartName: this.state.chosenStat});
    event.preventDefault();
    test(this.state);
    var x = document.getElementById("chart");
    x.hidden = false;
  };
  myChangeHandler1 = (event) => {
    this.setState({ p1name: event.target.value });
  };
  myChangeHandler2 = (event) => {
    this.setState({ p2name: event.target.value });
  };
  myChangeHandler3 = (event) => {
    this.setState({ chosenStat: event.target.value });
  };
  myChangeHandler4 = (event) => {
    this.setState({ monthOrYear: event.target.value });
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
        text: "Predicted "+titleCase(this.state.statChartName.replaceAll("_", " "))+" Per 36 Minutes for Players",
      },
      axisY: {
          title: "" + titleCase(this.state.statChartName.replaceAll("_", " ")),
      },
      axisX: {
        title: "Date",
        valueFormatString: "YYYY",
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "spline",
          name: ""+titleCase(this.state.p1ChartName)+" Predicted "+titleCase(this.state.statChartName.replaceAll("_", " "))+" per 36 minutes",
          showInLegend: true,
          markerType: "circle",
          dataPoints: p1,
        },
        {
          type: "spline",
          name: ""+titleCase(this.state.p2ChartName)+" Predicted "+titleCase(this.state.statChartName.replaceAll("_", " "))+" per 36 minutes",
          showInLegend: true,
          markerType: "square",
          dataPoints: p2,
        },
      ],
    };
    return (
      <>
        <h1>Compare Per 36 Stats Between Players</h1>
        <form onSubmit={this.mySubmitHandler}>
          <label>
            Player Name 1:
            <input type="text" onChange={this.myChangeHandler1} required />
          </label>
          <label>
            Player Name 2:
            <input type="text" onChange={this.myChangeHandler2} required />
          </label>
          <br />
          <label>
              Choose a stat:
              <select multiple={false} value={this.props.chosenStat} onChange={this.myChangeHandler3} required>
                  <option value={""}>-- Choose Statistic --</option>
                  <option value={"fieldgoals_made"}>Fieldgoals Made</option>
                  <option value={"fieldgoals_attempted"}>Fieldgoals Attempted</option>
                  <option value={"threepoints_made"}>Threepoints Made</option>
                  <option value={"threepoints_attempted"}>Threepoints Attempted</option>
                  <option value={"freethrows_made"}>Freethrows Made</option>
                  <option value={"freethrows_attempted"}>Freethrows Attempted</option>
                  <option value={"offensive_rebounds"}>Offensive Rebounds</option>
                  <option value={"defensive_rebounds"}>Defensive Rebounds</option>
                  <option value={"total_rebounds"}>Total Rebounds</option>
                  <option value={"assists"}>Assists</option>
                  <option value={"steals"}>Steals</option>
                  <option value={"blocks"}>Blocks</option>
                  <option value={"turnovers"}>Turnovers</option>
                  <option value={"personal_fouls"}>Personal Fouls</option>
                  <option value={"points"}>Points</option>
              </select>
          </label>
          <div className="radio">
            <input
              type="radio"
              value="year"
              checked={this.state.monthOrYear === "year"}
              onChange={this.myChangeHandler4}
            />
            yearly
            <input
              type="radio"
              value="month"
              checked={this.state.monthOrYear === "month"}
              onChange={this.myChangeHandler4}
            />
            monthly
          </div>
          <br />
          <br />
          <input type="submit" />
          <br />
        </form>
        <Link to="/">
          <button variant="outlined">Home</button>
        </Link>
        <br />
        <br />
        <div id="chart" hidden>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        </div>
        <br />
      </>
    );
  }
}

export default Query2;
