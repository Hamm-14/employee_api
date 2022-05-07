const express = require("express"); //using express as a server
const port = process.env.PORT || 8000; //use port in env variable for production

const app = express(); //initializing express

const db = require("./config/mongoose"); //importing mongoose

const passportJWT = require("./config/passport-jwt-strategy"); //importing passport-jwt-strategy from config

app.use(express.urlencoded({ extended: false })); //using body parser

app.use("/api", require("./routes/api")); //for all api routes

app.listen(port, function (err) {
  if (err) {
    console.log("Error in starting the server", err);
  }
  console.log("Server is up and running on port:", port);
});
