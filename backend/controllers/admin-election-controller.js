import mongoose from "mongoose";
import {ElectionSchema } from "../models/election.js";
import {PositionSchema } from "../models/position.js";

const Election = mongoose.model("Election", ElectionSchema);
const Position = mongoose.model("Position", PositionSchema );

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

const addPosition = async (req,res) => {
    try
    {
        const {position_name, election_id} = req.body;
        
        const positionChecker = await Position.findOne({position_name: position_name, election_id: election_id});
        
        if(!positionChecker)
        {
            const newPosition = new Position({
                position_name: position_name.toLowerCase(),
                election_id: election_id
            });

            await newPosition.save();
            res.send({success: true, message: "Added Successfully!"});
        }
        else
        {
            console.log(positionChecker)
            res.send({success: false, message: "Position name already exist!"});
        }
    }
    catch(err)
    {
        console.log(err)
        res.send({success: false, message: "An error occured"});
    }
}

const getPositions = async (req,res) => {
    try
    {
        const positions = await Position.find({election_id: req.body.election_id});
        res.send(positions);
    }
    catch(err)
    {
        console.log(err)
    }
}

export {addElection, getElections, getElectionByName, addPosition, getPositions};