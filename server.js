const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

mongoDBURI = "mongodb+srv://amysmerlick:Smerlick@1@cluster0.wvgo1.mongodb.net/budget?retryWrites=true&w=majority"

mongoose.connect(
    mongoDBURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});