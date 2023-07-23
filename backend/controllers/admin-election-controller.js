import mongoose from "mongoose";
import {ElectionSchema } from "../models/election.js";

const Election = mongoose.model("Election", ElectionSchema);

const addElection = async (req,res) => {
    try
    {
        const {election_name, start_date_time, end_date_time, is_results_open} = req.body;

        const electionChecker = await Election.findOne({election_name: election_name});

        if(!electionChecker)
        {
            const newElection = new Election({
                election_name: election_name.toLowerCase(),
                start_date_time: new Date(start_date_time),
                end_date_time: new Date(end_date_time),
                is_results_open: is_results_open
            });

            await newElection.save();
            res.send({success: true, message: "Added Successfully!"});
        }
        else
        {
            res.send({success: false, message: "Election name already exist!"});
        }
    }
    catch(err)
    {
        console.log(err)
        res.send({success: false, message: "An error occured"});
    }
}

const getElections = async (req,res) => {
    try
    {
        const elections = await Election.find({});
        res.send(elections);

    }
    catch(err)
    {
        console.log(err)
        res.send({success: false, message: "An error occured"});
    }
}

const getElectionByName = async (req,res) => {
    try
    {
        const election = await Election.findOne({election_name: req.query.name});
        res.send(election);
    }
    catch(err)
    {
        console.log(err)
    }
}

export {addElection, getElections, getElectionByName};