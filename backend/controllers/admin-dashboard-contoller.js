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
export {getMemberCount, getElectionCount}