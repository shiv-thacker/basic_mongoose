// when we want to use two or more than two operators, we uses logical operators.
//and,not,nor,or
//syntax for and,or,nor : .find({$or: [ {field1 : ""}, {field2 :""},....])
//sytax for not : .find({ videos: { $not: { $gt: 50 } }}),.find({ videos: { $not: { $eq: 50 } }})
const mongoose = require("mongoose");
const mongoDB = "mongodb://0.0.0.0:27017/mongoosebasic";

mongoose
  .connect(mongoDB)
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(`unable to connect server : ${err}`));

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

const getDocument = async () => {
  try {
    const result = await Playlist.find({
      $and: [{ ctype: "backend" }, { videos: { $lt: 50 } }],
    }).select({
      name: 1,
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

getDocument();
