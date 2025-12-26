const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: "appuser",
  password: "app12345",
  database: "resturant",
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to DB");
  }
});

app.get("/api/recommend", (req, res) => {
  const meal = req.query.meal;
  if (!meal) return res.status(400).send("Meal required");

  db.query(
    "SELECT name, rating FROM restaurants WHERE meal = ? ORDER BY rating DESC LIMIT 1",
    [meal],
    (err, results) => {
      if (err) return res.status(500).send("DB error");
      if (!results.length) return res.send("No recommendation found");
      res.send(`Recommended restaurant: ${results[0].name} (Rating: ${results[0].rating})`);
    }
  );
});

app.listen(3001, () => console.log("Backend running on 3001"));
