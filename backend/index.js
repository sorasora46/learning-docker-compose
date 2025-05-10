import express from "express";
import pg from "pg";
import "dotenv/config";
import cors from "cors";

const PORT = process.env.BACKEND_PORT || 3000;

const app = express();

const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_PORT = process.env.POSTGRES_PORT;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB = process.env.POSTGRES_DB;

const db = new pg.Pool({
  host: POSTGRES_HOST,
  port: POSTGRES_PORT ,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
});

const initTable = "DROP TABLE IF EXISTS tb_user;CREATE TABLE tb_user (name VARCHAR(255) PRIMARY KEY NOT NULL);"
const initRow = "INSERT INTO tb_user(name) VALUES('SORRAWIT');"
db.query(initTable).then(() => {
  console.log("CREATE TABLE SUCCESS");
  db.query(initRow).then(() => console.log("INSERT ROW SUCCESS"));
});

app.use(cors());

app.get("/ping", (_, res) => {
  const response = {
    message: "pong"
  };

  res.json(response);
});

app.get("/db", async (_, res) => {
  const query = "SELECT * FROM tb_user;";
  const response = await db.query(query);

  res.json(response);
})

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT:${PORT}`);
});
