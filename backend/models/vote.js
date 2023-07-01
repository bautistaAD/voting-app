import mongoose from "mongoose";
const {Schema} = mongoose;

const VoteSchema = new Schema({
    voter_id: {type: Schema.Types.ObjectId, ref: "User"},
    vote: [{type: Schema.Types.ObjectId, ref: "Candidates"}]
});

const Vote =  mongoose.model("Vote", VoteSchema);
export {Vote, VoteSchema};