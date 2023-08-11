const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }, 
    photoUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"], 
      default: "user"
    },
  })

  

const User = model("User", userSchema);

module.exports = User;
