"use strict";

require("dotenv").config();

import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import strategy from "./config/passport";
import { SESSION_SECRET } from "./lib/secrets";
import session from "express-session";

const app = express();

// Connect DB
require("./config/database");

passport.use(strategy);

//setup
app.set("port", process.env.PORT || 5000);
app.set("env", process.env.NODE_ENV);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define Routes
app.use("/", require("./routes/web.routes"));
app.use("/api/v1", require("./routes/api.routes"));

// Attach public folder
app.use(express.static(__dirname + "/public"));

// Allow reverse proxy
app.set("trust proxy", true);

// Init Session
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 30000}
}))

// Initialize views using EJS
app.set("views", path.join(__dirname, "../src/views"));
app.engine("ejs", require("./ejs-extended"));

export default app;