import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";
import { ObjectId } from "mongodb";


import {ElectionSchema } from "../models/election.js";
import {PositionSchema } from "../models/position.js";
import { CandidateSchema } from "../models/candidate.js";
import { UserSchema } from "../models/user.js";


const Position = mongoose.model("Position", PositionSchema );
const User = mongoose.model("User", UserSchema);
const Candidate = mongoose.model("Candidate", CandidateSchema);

//set up multer stroge
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir("./uploads/", (err) => {
            cb(null, "./uploads/");
        });
    },
    filename: (req,file,cb) => {
        //Define the filename for each uploaded file
        cb(null, file.originalname);
    },
});

//create the multer instance
const upload = multer({storage});

//gpoa file

const addCandidate = async (req,res) => {
    try
    {
        const {member_id, position} = req.body;
        const gpoa = req.file


        const newCandidate = new Candidate({
            member_id: new ObjectId(member_id),
            position: position,
            gpoa: gpoa
        })

        await newCandidate.save()

        res.send({success: true, message: "Added Successfully!"});
    }
    catch(err)
    {
        console.log(err);
        res.send({success: false, message: "An error occured"});
    }
}

const getCandidates = async (req,res) => {
    try
    {
        const candidates = await Candidate.find({});
        res.send(candidates);
    }
    catch(err)
    {
        console.log(err);
        res.send(err);
    }
}

const getMembersNotCandidate = async(req, res) => { //members
    try
    {
        const candidatesPerPosition = await Candidate.find({position: req.body.position});
        const allMembers = await User.find({'user_type': {$ne: "Admin"}});
        const membersNotCandidates = allMembers;

        for(let i =0; i < candidatesPerPosition.length; i++){
            for(let y=0; y < allMembers.length; y++){
                if(JSON.stringify(candidatesPerPosition[i].member_id) == JSON.stringify(membersNotCandidates[y]._id))
                {
                    membersNotCandidates.splice(y, 1);
                }
            }
        }
        
        res.send(membersNotCandidates)
    
    }
    catch(err)
    {
        console.log(err);
    }
}



export {addCandidate, upload, getCandidates, getMembersNotCandidate};