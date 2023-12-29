import mongoose from "mongoose";
import multer from "multer";
import fs, { fdatasync } from "fs";
import { ObjectId } from "mongodb";


import {Election, ElectionSchema } from "../models/election.js";
import {PositionSchema } from "../models/position.js";
import { CandidateSchema } from "../models/candidate.js";
import { UserSchema } from "../models/user.js";
import { cachedDataVersionTag } from "v8";


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

const getAllCandidates = async (req,res) => { //get members that are candidates
    try
    {
        const candidates = await Candidate.find({});
        const members = await User.find({});
        const candidateMembers = [];

        for(let i = 0; i < candidates.length; i++){
            for(let y = 0; y < members.length; y++)
            {
                if(JSON.stringify(candidates[i].member_id) == JSON.stringify(members[y]._id))
                {
                    if(!candidateMembers.includes(members[y]))
                    {
                        candidateMembers.push(members[y]);
                    }
                }
            }
        }

        res.send(candidateMembers)
        
    }
    catch(err)
    {
        console.log(err);
        res.send(err);
    }
}

const getCandidatesInElection = async (req, res) => {
    try
    {
        const position = await Position.find({election_id: req.body.election_id});
        const candidates = await Candidate.find({});
        
        const candidateMembers = [];

        for(let i = 0; i < position.length; i++){
            for(let y = 0; y < candidates.length; y++)
            {
                if(JSON.stringify(candidates[y].position) == JSON.stringify(position[i]._id))
                {
                    const member = await User.find({_id: candidates[y].member_id});
                    candidateMembers.push(member[0]);
                    break; 
                }
            }
        }

        const uniqueCandidates = Array.from(new Set(candidateMembers));
        res.send(candidateMembers);
        
    }
    catch(err)
    {
        console.log(err);
        res.send(err);
    }
}

const getCandidatesPerPosition = async (req, res) => {
    try
    {
        const candidates = await Candidate.find({position: req.body.position});
        const members = await User.find({})
        
        const candidateMembers = [];

        for(let i = 0; i < candidates.length; i++){
            for(let y = 0; y < members.length; y++)
            {
                if(JSON.stringify(candidates[i].member_id) == JSON.stringify(members[y]._id))
                {
                    if(!candidateMembers.includes(members[y]))
                    {
                        candidateMembers.push(members[y]);
                    }
                    
                }
            }
        }

        res.send(candidateMembers)
        
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

const deleteManyCandidate = async(req, res) => {
    try
    {
        const findDelCandidate = await Candidate.find({member_id: req.body.member_id});
        const deleteCandidate = await Candidate.deleteMany({member_id: req.body.member_id})
        if (deleteCandidate.deletedCount > 0) 
        {
            
            for(let i=0; i<findDelCandidate.length; i++)
            {
                const path = findDelCandidate[i].gpoa.path
                fs.unlinkSync(path)
            }
            res.send({ success: true, message: "Deleted successfully"})
        } 
        else 
        { 
            res.send({ success: false, message: "An error occured" })
        }

    }
    catch(err)
    {
        console.log(err)
    }
}

// const deleteCandiateByElection = async(req,res) => {
//     try
//     {
//         const findCandidateElection = await Position.find({election_id: req.body.election_id})
//         const findDelCandidate = await Candidate.find({member_id: req.body.member_id});
//         const deleteCandidate = await Candidate.deleteMany({member_id: req.body.member_id})
//         if (deleteCandidate.deletedCount > 0) 
//         {
            
//             for(let i=0; i<findDelCandidate.length; i++)
//             {
//                 const path = findDelCandidate[i].gpoa.path
//                 fs.unlinkSync(path)
//             }
//             res.send({ success: true, message: "Deleted successfully"})
//         } 
//         else 
//         { 
//             res.send({ success: false, message: "An error occured" })
//         }

//     }
//     catch(err)
//     {
//         console.log(err)
//     }
// }



export {addCandidate, upload, getAllCandidates, getMembersNotCandidate, getCandidatesInElection, getCandidatesPerPosition, deleteManyCandidate};