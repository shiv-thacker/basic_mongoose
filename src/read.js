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

//mongoose is wrapper on schema
// here we are making class of model, class starts with capital
//It contains collection name (which should be in singular form, and first letter should capital(Pascal form)) & schema
const Playlist = new mongoose.model("Playlist", playlistSchema);

//const result = await Playlist.find({ ctype: "Front End" }) to see document who has "Front End"

//find().select() - to show perticuler feild of document

//find().select().limit() - to see only first output

const getDocument = async () => {
  try {
    const result = await Playlist.find({ ctype: "Front End" })
      .select({
        name: 1,
      })
      .limit(1);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

getDocument();
