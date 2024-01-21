import mongoose from "mongoose";
import { UserSchema } from "../models/user.js";
import {ElectionSchema } from "../models/election.js";

const Election = mongoose.model("Election", ElectionSchema);
const User = mongoose.model("User", UserSchema);

const getMemberCount = async (req,res) => {
    try
    {
        const memberCount = await User.find({}).count();
        res.send(String(memberCount));
    }
    catch(err)
    {
        console.log(err);
    }
}

const getElectionCount = async (req,res) => {
    try
    {
        const electionCount = await Election.find({}).count();
        res.send(String(electionCount));
    }
    catch(err)
    {
        console.log(err);
    }
}

const getOngoingElection  = async (req,res) => {
    try
    {
        const elections = await Election.find({});
        const onGoingElections = []
        const current = new Date();

        for(let i = 0; i < elections.length; i++)
        {
            const start = elections[i].start_date_time;
            const end = elections[i].end_date_time;

            if(start < current && current < end)
            {
                onGoingElections.push(elections[i]);
            }
        }
        res.send(onGoingElections);

    }
    catch(err)
    {
        console.log(err)
        res.send({success: false, message: "An error occured"});
    }
}

const getUpcomingElection  = async (req,res) => {
    try
    {
        const elections = await Election.find({});
        const upcomingElections = []
        const current = new Date();

        for(let i = 0; i < elections.length; i++)
        {
            const start = elections[i].start_date_time;
            const end = elections[i].end_date_time;

            if(current < start && current < end)
            {
                upcomingElections.push(elections[i]);
            }
        }
        res.send(upcomingElections);

    }
    catch(err)
    {
        console.log(err)
        res.send({success: false, message: "An error occured"});
    }
}

export {getMemberCount, getElectionCount, getOngoingElection, getUpcomingElection}