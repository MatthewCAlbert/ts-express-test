const mongoose = require("mongoose");

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */

const devConnection = process.env.MONGODB_STRING_DEV;
const prodConnection = process.env.MONGODB_STRING_PROD || "";

// Connect to the correct environment database
if (process.env.NODE_ENV === "production") {
  mongoose.connect(prodConnection, {
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).catch(err=> console.log(err));

  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });
} else {
  mongoose.set("debug", true);
  mongoose.connect(devConnection, {
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).catch(err=> console.log(err));

  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });
}
