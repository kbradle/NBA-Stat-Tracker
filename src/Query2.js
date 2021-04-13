import React from "react";
import { Link } from "react-router-dom";
import { CanvasJSChart } from "canvasjs-react-charts";

var p1 = [];
var p2 = [];

function test(param) {
  p1.length = 0;
  p2.length = 0;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  var adjustedName1 = param.p1name.replaceAll("'", "''");
  var finalName1 = "UPPER('"+adjustedName1+"')";
  var adjustedName2 = param.p2name.replaceAll("'", "''");
  var finalName2 = "UPPER('"+adjustedName2+"')";

  //var data = "query=SELECT Name, P36, gyear FROM (SELECT players.player_name AS Name, ((games_details." + param.chosenStat + " / games_details.seconds_played) * 2160) AS P36, Extract(year from games.game_date) AS gyear FROM players, games_details, games WHERE games_details.player_ID = players.player_ID AND games.game_ID = games_details.game_ID AND (UPPER(players.player_name) = " + finalName1 + ") AND games_details.seconds_played != 0 UNION SELECT players.player_name AS Name, ((games_details." + param.chosenStat + " / games_details.seconds_played) * 2160) AS P36, Extract(year from games.game_date) AS gyear FROM players, games_details, games WHERE games_details.player_ID = players.player_ID AND games.game_ID = games_details.game_ID AND (UPPER(players.player_name) = " + finalName2 + ") AND games_details.seconds_played != 0) ORDER BY gyear ASC";

  var data = "query=SELECT Name, P36, to_char(\"TRUNC(GAME_DATE,'MONTH')\",'YYYY-MM') as \"Date\" FROM (SELECT players.player_name AS Name, ((games_details." + param.chosenStat + " / games_details.seconds_played) * 2160) AS P36, Trunc(Game_Date, 'Month') FROM players, games_details, games WHERE games_details.player_ID = players.player_ID AND games.game_ID = games_details.game_ID AND (UPPER(players.player_name) = " + finalName1 + ") AND games_details.seconds_played != 0 UNION SELECT players.player_name AS Name, ((games_details." + param.chosenStat + " / games_details.seconds_played) * 2160) AS P36, Trunc(Game_Date, 'Month') FROM players, games_details, games WHERE games_details.player_ID = players.player_ID AND games.game_ID = games_details.game_ID AND (UPPER(players.player_name) = " + finalName2 + ") AND games_details.seconds_played != 0) ORDER BY \"Date\" ASC";


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
    this.state = { p1name: "", p2name: "", chosenStat: ""};
    this.updateChart = this.updateChart.bind(this);
    this.chart = "";
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    test(this.state);
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
        text: "Stats Per 36-Minute for Players",
      },
      axisY: {
          title: "" + this.state.chosenStat.replaceAll("_", " "),
      },
      axisX: {
        title: "Date",
        valueFormatString: "MM-YYYY",
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "spline",
          name: this.state.p1name,
          showInLegend: true,
          dataPoints: p1,
        },
        {
          type: "spline",
          name: this.state.p2name,
          showInLegend: true,
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
            <input type="text" onChange={this.myChangeHandler1} />
          </label>
          <label>
            Player Name 2:
            <input type="text" onChange={this.myChangeHandler2} />
          </label>
          <label>
              Choose a stat:
              <select multiple={false} value={this.props.chosenStat} onChange={this.myChangeHandler3}>
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
          <input type="submit" />
        <Link to="/">
          <button variant="outlined">Home</button>
        </Link>
        </form>

        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        <br />
        <br />
      </>
    );
  }
}

export default Query2;
