import mongoose from "mongoose";
const { Schema } = mongoose;

const ElectionSchema = new Schema({
    election_name: {type: String, required: true}
})