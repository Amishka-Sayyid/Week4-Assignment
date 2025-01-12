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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//--------------------

app.post("/submit", function (req, res) {
  console.log("received data", req.body);

  const receivedData = req.body.formValues;

  res.json({ message: "Data received successfully!", receivedData });
});

app.get("/messages", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM guestbook");
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: "No messages found." });
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
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

// POST route to create new data in the database
app.post("/new-data", async (req, res) => {
  try {
    const data = req.body.formValues;

    // Query to insert data into the guestbook table
    const query = await db.query(
      `INSERT INTO guestbook (user_name, favourite_colour, message) VALUES ($1, $2, $3) RETURNING *`,
      [data.user_name, data.favourite_colour, data.message]
    );

    // Send the inserted row as a JSON response
    res.json({
      message: "Data inserted successfully!",
      newData: query.rows[0],
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to insert data" });
  }
});
