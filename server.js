const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

mongoDBURI = "mongodb+srv://amysmerlick:@cluster0.wvgo1.mongodb.net/budget?retryWrites=true&w=majority"

mongoose.connect(
    mongoDBURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

  const PORT = process.env.PORT || 3000;
  console.log(process.env.PORT)

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// routes
app.use(require("./routes/api.js"));

console.log("Starting server")
app.listen(process.env.PORT, () => console.log(`Listening on PORT: ${PORT}`));