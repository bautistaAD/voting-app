import mongoose from "mongoose";
const {Schema} = mongoose;

const PositionSchema = new Schema({
    position_name: { type: String, required: true},
    election_id: {type: Schema.Types.ObjectId, ref: "Election"}
});

const Position = mongoose.model("Position", PositionSchema);

export { Position, PositionSchema};
