const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  phone: Number,
  website: String,
  address: {
    steet: String,
    suite: String,
    city: String,
    zipcode: Number,
  },
  company: {
    name: String,
  },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
