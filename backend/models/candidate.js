import mongoose from "mongoose";
const { Schema } = mongoose;

const CandidateSchema = new Schema({
  member_id: {type: Schema.Types.ObjectId, ref: "User", required: true },
  position: [{type: Schema.Types.ObjectId, ref: "Position", required: true}],
  //gpoa: {}
});

const Candidate = mongoose.model("Candidate", CandidateSchema);

export { CandidateSchema, Candidate };