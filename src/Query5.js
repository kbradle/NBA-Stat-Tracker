import React from "react";
import { Link } from "react-router-dom";

var numTableTuples = "";

function test() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  var data =
    "query= SELECT SUM(COUNT) as total_tuples FROM (SELECT Count(*) as COUNT from JAWATSON.games_details " +
    " UNION SELECT Count(*) as COUNT from JAWATSON.games UNION SELECT Count(*) as COUNT from JAWATSON.players UNION SELECT Count(*) as COUNT from JAWATSON.ranking " +
    " UNION SELECT Count(*) as COUNT from JAWATSON.teamplayerrelation UNION SELECT Count(*) as COUNT from JAWATSON.teams)";
  xhr.send(data);

  xhr.onload = function () {
    if (xhr.status !== 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      var obj = JSON.parse(xhr.responseText);
      numTableTuples = "The number of tuples are: " + obj.message.rows[0][0];
      console.log(numTableTuples);
    }
  };
}

class Query5 extends React.Component {
  constructor(props) {
    super(props);
    this.updateTuples = this.updateTuples.bind(this);
    this.state = { numtuples: "" };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    test();
  };
  componentDidMount() {
    setInterval(this.updateTuples);
  }
  updateTuples() {
    this.setState({ numTuples: numTableTuples });
  }
  render() {
    return (
      <>
        <h1>Basic Database Queries</h1>
        <button onClick={this.mySubmitHandler}>Output Number of Tuples.</button>
        <div>{this.state.numTuples}</div>
        <br />
        <Link to="/">
          <button variant="outlined">Home</button>
        </Link>
        <br />
      </>
    );
  }
}

export default Query5;
