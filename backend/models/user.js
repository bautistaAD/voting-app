import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  middle_name: { type: String, required: true },
  last_name: { type: String, required: true },
  student_number: { type: String, required: false },
  //profile_picture: {data: Buffer, contentType: String}
  user_type: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

export { UserSchema, User};