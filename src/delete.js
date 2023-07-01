//const result = await Playlist.deleteOne({ _id });
//output will be { acknowledged: true, deletedCount: 1 }
//u can use also deleteMany();, deletemany use when we want to delete items with same name, so we will pass name

//now if you want output which shows what have you deleted then,
//use .findByIdAndDelete({_id})
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

const deleteDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndDelete({ _id }); // if key,value same then no need to write {_id : _id}
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

deleteDocument("649efac4184c361202733ab4");
