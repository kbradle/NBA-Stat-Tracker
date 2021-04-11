import React from "react";
import { Link } from "react-router-dom";
import { CanvasJSChart } from "canvasjs-react-charts";
import "./Query6.css";

var player1 = [];
var player2 = [];

function test(param) {
  player1.length = 0;
  player2.length = 0;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  var adjustedName1 = param.playerName1.replaceAll("'", "''");
  var adjustedName2 = param.playerName2.replaceAll("'", "''");

  var PERcalculation =
    "(1/(SUM(seconds_played)/60)) * ((SUM(fieldgoals_made) * 85.910) + sum(steals) * 53.897+ " +
    " sum(threepoints_made) * 51.757 + sum(freethrows_made) * 46.845 + sum(blocks) * 39.190 + sum(offensive_rebounds) * 39.190 +" +
    " sum(Assists) * 34.677 + sum(Defensive_rebounds) * 14.707 - sum(personal_fouls) * 17.174 - (sum(freethrows_attempted) - sum(freethrows_made)) * 20.091 -" +
    " (sum(fieldgoals_attempted) - sum(fieldgoals_made)) * 39.190 - sum(turnovers) * 53.897) AS PER, ";

  //"(1/(SUM(seconds_played)/60)) * " +
  //"((SUM(fieldgoals_made) * 85.910) + sum(steals) * 53.897 + sum(threepoints_made) * 51.757 + sum(freethrows_made) * 46.845 + sum(blocks) * " +
  //"39.190 + sum(offensive_rebounds) * 39.190 + sum(Assists) * 34.677 + sum(Defensive_rebounds) * 14.707 - sum(personal_fouls) * 17.174 - " +
  //"(sum(freethrows_attempted) - sum(freethrows_made)) * 20.091 - (sum(fieldgoals_attempted) - sum(fieldgoals_made)) * 39.190 - sum(turnovers) * 53.897) AS PER, ";

  let stringPlayer2;

  if (param.playerName2 === "Other" || param.playerName2 === "other") {
    stringPlayer2 = "!= upper('" + adjustedName1 + "') ";
  } else {
    stringPlayer2 = "= upper('" + adjustedName2 + "') ";
  }
  let queryPlayer2;

  if (param.playerName2 === "") {
    queryPlayer2 = "";
  } else {
    queryPlayer2 =
      "UNION " +
      "SELECT '" +
      adjustedName2 +
      "' as Name, Count(game_ID) as num, " +
      PERcalculation +
      " Trunc(Game_Date, 'Month') " +
      "FROM JAWATSON.players NATURAL JOIN JAWATSON.games_details NATURAL JOIN JAWATSON.games " +
      "where upper(PLAYER_NAME) " +
      stringPlayer2 +
      "and Seconds_played > 0 GROUP BY Trunc(Game_Date, 'Month')";
  }

  var data =
    "query=" +
    "SELECT Name, PER,  to_char(\"TRUNC(GAME_DATE,'MONTH')\",'YYYY-MM') as \"Date\" FROM (SELECT '" +
    adjustedName1 +
    "' as Name, Count(game_ID) as num, " +
    PERcalculation +
    "Trunc(Game_Date, 'Month') " +
    "FROM JAWATSON.players NATURAL JOIN JAWATSON.games_details NATURAL JOIN JAWATSON.games " +
    "where upper(PLAYER_NAME) = upper('" +
    adjustedName1 +
    "') and Seconds_played > 0  GROUP BY Trunc(Game_Date, 'Month') " +
    queryPlayer2 +
    ") WHERE num > " +
    param.minGames +
    ' order By "Date"';

  data = data.replaceAll("+", "%2B");
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
        if (
          obj.message.rows[i][0].toLowerCase() ===
          param.playerName1.toLowerCase()
        ) {
          player1.push({
            y: obj.message.rows[i][1],
            label: obj.message.rows[i][2],
            x: new Date(
              obj.message.rows[i][2].substring(0, 4),
              obj.message.rows[i][2].substring(5, 7)
            ),
          });
        } else {
          player2.push({
            y: obj.message.rows[i][1],
            label: obj.message.rows[i][2],
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

class Query6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName1: "",
      playerName2: "",
      monthOrYear: 1,
      minGames: 0,
    };
    this.updateChart = this.updateChart.bind(this);
    this.chart = "";
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    test(this.state);
  };
  myChangeHandler1 = (event) => {
    this.setState({ playerName1: event.target.value });
  };
  myChangeHandler2 = (event) => {
    this.setState({ playerName2: event.target.value });
  };
  myChangeHandler3 = (event) => {
    this.setState({ minGames: event.target.value });
  };
  optionChange = (event) => {
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
        text: "Player Efficiency Rating Of a Player over Time",
      },
      axisY: {
        title: "Player Efficiency Rating",
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
          name: this.state.playerName1,
          showInLegend: true,
          markerType: "circle",
          dataPoints: player1,
        },
        {
          type: "spline",
          name: this.state.playerName2,
          showInLegend: true,
          markerType: "square",
          dataPoints: player2,
        },
      ],
    };
    return (
      <>
        <h1>One Number Metrics</h1>
        <form onSubmit={this.mySubmitHandler}>
          <label>
            Player Name 1:
            <input type="text" onChange={this.myChangeHandler1} />
          </label>
          <label>
            Player Name 2: Type "Other" to get all other Players
            <input type="text" onChange={this.myChangeHandler2} />
          </label>
          <label>
            Enter Minimum Number of Games:
            <input type="text" onChange={this.myChangeHandler3} />
          </label>
          <label>
            Group by:
            <select
              multiple={false}
              value={this.props.monthOrYear}
              onChange={this.optionChange}
            >
              <option value={1}>Month</option>
              <option value={2}>Year</option>
            </select>
          </label>
          <p>
            <input type="submit" />
            <Link to="/">
              <button variant="outlined">Home</button>
            </Link>
          </p>
        </form>

        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        <br />
        <br />
      </>
    );
  }
}

export default Query6;
