// const {model} = require("mongoose")

// const UsersSchema = require("../schemas/UsersSchema")

// const UsersModel = new model("User",UsersSchema);

// module.exports = {UsersModel}

const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },

    name: {
      type: String,
      required: [true, "Your username is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    mobileNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UsersSchema);

module.exports = User;
