import express from "express";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

const app = express();

const db: Database = await open({
  filename: "./data/database.sqlite",
  driver: sqlite3.Database,
});


await db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");

app.get("/", async (_, res) => {
  const users = await db.all("SELECT * FROM users");
  res.json(users);
});

app.listen(3000, () => console.log("Server running on port 3000"));
