//import packages
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

//start or configure packages
//tell server to use JSON
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//create a root route
app.get("/", (req, res) => {
  res.send("This is the root route!");
});

//set up a port for the server by listening...
app.listen(8080, () => {
  console.log(`Server running on port 8080`);
});

//===================================
//set up your database pool
const dbConnectionString = process.env.DATABASE_URL;
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

//=========================================
//I need a route to READ data from the database
//I need a route to CREATE new data in the database

app.post("/new-data", async (req, res) => {
  const data = req.body.formValues;
  const query = await db.query(
    `INSERT INTO guestbook (user_name, favourite_colour, message) VALUES ($1, $2, $3)`,
    [data.input1, data.input2, data.input3]
  );
  await res.json(query.rows);
});
