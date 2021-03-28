const express = require("express");
const path = require("path");
var cors = require("cors");

const port = process.env.PORT || 8080;
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(cors());

var connection;
const oracledb = require("oracledb");
const { connect } = require("http2");
try {
  oracledb.initOracleClient({
    libDir: process.env.ORACLE_PATH,
  });
} catch (err) {
  console.error("Whoops!");
  console.error(err);
  process.exit(1);
}

(async function () {
  try {
    connection = await oracledb.getConnection({
      user: process.env.ORACLE_USERNAME,
      password: process.env.ORACLE_PASSWORD,
      connectString: "oracle.cise.ufl.edu:1521/orcl",
    });
    console.log("Successfully connected to Oracle!");

    const result = await connection.execute("SELECT * FROM COUNTRY");
    console.log(result.rows);
  } catch (err) {
    console.log("Error: ", err);
  }
})();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
