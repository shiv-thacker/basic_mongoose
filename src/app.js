const mongoose = require("mongoose");
const express = require("express");
const app = express();
const mongoDB = "mongodb://0.0.0.0:27017/mongoosebasic";

mongoose
  .connect(mongoDB)
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(`unable to connect server : ${err}`));

//schema defines the data structure of document, also use to get values, validators etc., it also used to provide datatypes
// here we create object or instance of schema
const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ctype: String,
  videos: Number,
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

// here we are making class of model, class starts with capital
//It contains collection name (which should be in singular form, and first letter should capital) & schema
const Playlist = new mongoose.model("Playlist", playlistSchema);

app.listen(8000, () => {
  console.log("on port 8000!!");
});

//mongoose is wrapper on schema
// It provides an interface to the
