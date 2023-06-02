const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const dbPath = path.join(__dirname, "goodreads.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error at {e.message}`);
  }
};

initializeDBAndServer();

app.get("/books/", async (req, res) => {
  const getBooksQuery = `SELECT * FROM book ORDER BY book_id;`;
  const booksArray = await db.all(getBooksQuery);
  res.send(booksArray);
});
