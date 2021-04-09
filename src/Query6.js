import React from "react";
import { Link } from "react-router-dom";
import { CanvasJSChart } from "canvasjs-react-charts";

var player1 = [];
var player2 = [];

function test(param) {
  player1.length = 0;
  player2.length = 0;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  var data =
    'query= select t.team_name, sum(d.threepoints_attempted) as "3PTA",  Extract(year from g.game_date)as gyear from jawatson.games_details d, jawatson.teams t, JAWATSON.games g where d.team_id = t.team_id and g.game_id = d.game_id and (t.team_name = \'' +
    param.playerName1 +
    "' or t.team_name = '" +
    param.playerName2 +
    "') group by t.team_name, Extract(year from g.game_date) order by Extract(year from g.game_date) asc";

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
        if (obj.message.rows[i][0] === param.playerName1) {
          player1.push({
            y: obj.message.rows[i][1],
            label: obj.message.rows[i][2],
          });
        } else {
          player2.push({
            y: obj.message.rows[i][1],
            label: obj.message.rows[i][2],
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
    this.state = { playerName1: "", playerName2: "" };
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
        valueFormatString: "YYYY",
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "spline",
          name: this.state.playerName1,
          showInLegend: true,
          dataPoints: player1,
        },
        {
          type: "spline",
          name: this.state.playerName2,
          showInLegend: true,
          dataPoints: player2,
        },
      ],
    };
    return (
      <>
        <Link to="/">
          <button variant="outlined">Home</button>
        </Link>
        <h1>One Number Metrics</h1>
        <form onSubmit={this.mySubmitHandler}>
          <label>
            Player Name 1:
            <input type="text" onChange={this.myChangeHandler1} />
          </label>
          <label>
            Player Name 2:
            <input type="text" onChange={this.myChangeHandler2} />
          </label>
          <input type="submit" />
        </form>

        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        <br />
        <br />
      </>
    );
  }
}

export default Query6;
