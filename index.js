const express = require("express"); //using express as a server
const port = process.env.PORT || 8000; //use port in env variable for production

const app = express(); //initializing express

app.listen(port, function (err) {
  if (err) {
    console.log("Error in starting the server", err);
  }
  console.log("Server is up and running on port:", port);
});
