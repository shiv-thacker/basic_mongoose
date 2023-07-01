// when we want to use two or more than two operators, we uses logical operators.
//.count()    (if count deprecated u can use .countDocuments()), syntax : .find().countDocuments()

//.sort()
//syntax : .sort({name : 1})// 1 means ascending , -1 means descending
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
      author: "shivang thacker",
    })
      .select({
        name: 1,
      })
      .sort({ name: -1 });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

getDocument();
