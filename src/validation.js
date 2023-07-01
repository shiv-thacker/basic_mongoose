// mongoose provide us validation with schema
//"unique" is not a validator in mongoose, it helper for building MongoDB unique indexes. But it work as a valiadator.
//trim can only trim befor first word blank space, and after last word blank space, it's not useful for middle space
//match used to match values
//minlength , maxlength, lowercase, uppercase
//enum used to validate you variable, your input should be matching with one of it's values

//custom navigation
//we can give custom navigation with "validate" property, we have given in "videos" in this file

//npm validator package, it provides default validation, const validator = require("validator");, like we can check "isEmail(value)"

const mongoose = require("mongoose");

const mongoDB = "mongodb://0.0.0.0:27017/mongoosebasic";
const validator = require("validator");

mongoose
  .connect(mongoDB)
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(`unable to connect server : ${err}`));

//schema defines the data structure of document, also use to get values, validators etc., it also used to provide datatypes
// here we create object or instance of schema
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: [2, "minimum 2 letters required"],
    maxlength: 16,
    enum: ["reactjs", "backend", "database"],
  },
  ctype: String,
  // custom validation
  videos: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("videos can not be less then zero");
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
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

//To create document we declare object reactPlaylist

// reactPlaylist.save() is promies, means it takes some time & then gives output. So we will use async(), await for it & also we will use .then() .cache()

const createDocument = async () => {
  try {
    //to pass multiple data we just need to add one more object
    const mongoPlaylist = new Playlist({
      name: "reactjs",
      ctype: "database",
      videos: 10,
      email: "shivang@gmail.co",
      author: "shivang thacker",
      active: true,
    });
    // const result = await reactPlaylist.save(); to insert only one variable
    const result = await Playlist.insertMany([mongoPlaylist]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();
