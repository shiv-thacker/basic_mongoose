//updateOne({_id}, {{ $set: { name: "mongodb" } }})  to update name but it will only give output like (acknowledge: true, modifiedcount :1, matchedcount:1, upsertedId :null, upsertedCount:1)
// to get output with document parameters we  use

//.findByIdAndUpdate()  but we have to use ({{_id}, {{ $set: { name: "mongodb" } }}}, {useFindAndModify: false}), ans when we update this , it shows whole
//document with previous value
//to get current value after modified we will use new:trur, .findByIdAndUpdate()({{_id}, {{ $set: { name: "mongodb" } }}}, {new : true, useFindAndModify: false})

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
// update the document
const updateDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndUpdate(
      { _id },
      { $set: { name: "reactjs" } },
      { new: true, useFindAndModify: false }
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

updateDocument("649ee740a4fc006e76760194");

// operators:
// $currentDate
// Sets the value of a field to current date, either as a Date or a Timestamp.
// $inc
// Increments the value of the field by the specified amount.
// $min
// Only updates the field if the specified value is less than the existing field value.
// $max
// Only updates the field if the specified value is greater than the existing field value.
// $mul
// Multiplies the value of the field by the specified amount.
// $rename
// Renames a field.
// $set
// Sets the value of a field in a document.
// $setOnInsert
// Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents.
// $unset
// Removes the specified field from a document.
