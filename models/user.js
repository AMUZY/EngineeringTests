import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 3-20 alphanumeric letters",
    ],
  },
  image: {
    type: String,
  },
  SigninType: {
    type: String,
    required: [true, "SigninType is required"],
  },
  password: {
    type: String,
    required: false,
  },
});

const User = models.User || model("User", userSchema);

export default User;
