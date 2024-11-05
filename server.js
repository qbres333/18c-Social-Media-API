// import express framework, database connection, and routes
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// retreive current working directory
const cwd = process.cwd();

// set the port and initialize an express instance
const PORT = process.env.port || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
