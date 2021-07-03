"use strict";

require("dotenv").config();

import express from "express";
import sass from "node-sass-middleware";
import cookieParser from "cookie-parser";
import passport from "passport";
import strategy from "./config/passport";

const port = process.env.PORT || 5000;
const app = express();

// Connect DB
require("./config/database");

passport.use(strategy);

//setup
app.set("port", process.env.PORT || 5000);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define Routes
app.use("/", require("./routes/web-routes"));
app.use("/api/v1", require("./routes/api-routes"));

// Watch and compile sass on dev
if (process.env.NODE_ENV === "development") {
  app.use(
    sass({
      src: "../public/scss",
      dest: "../public",
      outputStyle: "compressed",
      debug: true,
    })
  );
}

// Attach public folder
app.use(express.static(__dirname + "/public"));

// Allow reverse proxy
app.set("trust proxy", true);

// Initialize views using EJS
app.set("views", __dirname + "/src/views");
app.engine("ejs", require("./ejs-extended"));

export default app;