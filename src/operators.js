const mongoose = require("mongoose");
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

const Playlist = new mongoose.model("Playlist", playlistSchema);

//Syntax: { field: { $gt: value } }

//gt for greaterthan
//gte for greaterthan or equel to
//as same as for lt & lte
//eq for equal to

const getDocument = async () => {
  try {
    const result = await Playlist.find({ ctype: "backend" }).select({
      name: 1,
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

getDocument();
