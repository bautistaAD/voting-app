import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";


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
            cd(null, "./uploads/");
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
        const {memberid, positionid} = req.body;
        const gpoa = req.file

        const newCandidate = new Candidate({
            member_id: memberid,
            position_id: positionid,
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



export {addCandidate, upload};