const express = require("express");
const path = require("path");
var cors = require("cors");

const port = process.env.PORT || 8080;
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

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

async function init() {
  try {
    await oracledb.createPool({
      user: process.env.ORACLE_USERNAME,
      password: process.env.ORACLE_PASSWORD,
      connectString: "oracle.cise.ufl.edu:1521/orcl",
      poolIncrement: 0,
      poolMax: 4,
      poolMin: 4,
    });
    console.log("Successfully connected to Oracle!");
  } catch (err) {
    console.log("Error: ", err);
  }
}
init();

app.post("/", async (req, res, next) => {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection();
    result = await connection.execute(req.body.query);
  } catch (err) {
    res.status(401).send({ message: "Invalid SQL Query" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
  res.status(200).send({ message: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
