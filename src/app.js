const express = require("express");
const app = express();
const errorHandler = require("./lib/middleware/error-handler");
const petStoreApp = require("./pet-store/routes");

app.use("/pet-store", petStoreApp);

app.use(errorHandler());

module.exports = app;
