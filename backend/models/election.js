import mongoose from "mongoose";
const { Schema } = mongoose;

const ElectionSchema = new Schema({
    election_name: {type: String, required: true},
    start_date_time: {type: Date, required: true},
    end_date_time: {type: Date, required: true},
    is_results_open: {type: Boolean, required: true}
})

const Election = mongoose.model("Election", ElectionSchema);

export { Election, ElectionSchema};