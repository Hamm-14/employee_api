const express = require("express"); //using express as a server
const port = process.env.PORT || 8000; //use port in env variable for production

const app = express(); //initializing express
const db = require("./config/mongoose"); //importing mongoose

app.use(express.urlencoded({ extended: false })); //using body parser

app.listen(port, function (err) {
  if (err) {
    console.log("Error in starting the server", err);
  }
  console.log("Server is up and running on port:", port);
});
