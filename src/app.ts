"use strict";

require("dotenv").config();

import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import strategy from "./config/passport";
import { SESSION_SECRET } from "./lib/secrets";
import session from "express-session";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import compression from "compression";

const app = express();
passport.use(strategy);

const corsOptions: CorsOptions = {
    // origin: function (origin, callback) {
    //     if (["http://localhost:8080"].indexOf(origin) !== -1) {
    //         callback(null, true);
    //     } else {
    //         callback(null, false);
    //     }
    // },
    origin: "*",
    preflightContinue: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

//setup
app.set("port", process.env.PORT || 5000);
app.set("env", process.env.NODE_ENV);

//middleware
app.use(helmet())
app.use(compression())
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define Routes
app.options('*', cors());
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