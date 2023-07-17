import mongoose from "mongoose";
import {ElectionSchema } from "../models/election.js";

const Election = mongoose.model("Election", ElectionSchema);

const addElection = async (req,res) => {
    try
    {
        const {election_name, start_date_time, end_date_time, is_results_open} = req.body;

        const newElection = new Election({
            election_name: election_name.toLowerCase(),
            start_date_time: new Date(start_date_time),
            end_date_time: new Date(end_date_time),
            is_results_open: is_results_open
        });

        await newElection.save();
        res.send({success: true, message: "Added Successfully!"});
    }
    catch(err)
    {
        console.log(err)
        res.send({success: false, message: "An error occured"});
    }
}

export {addElection};