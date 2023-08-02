import mongoose from "mongoose";
import { UserSchema } from "../models/user.js";
import bcrypt from "bcrypt";

const User = mongoose.model("User", UserSchema);

const importCSV = async (req,res) => {
    const members = req.body.data;

    //function for validating email format
    function matchRegex(email){
        return /^([a-z0-9]+)@up\.edu\.ph$/i.test(email);
    }

    for(let i = 0; i < members.length ; i++)
    {
        let emailChecker = await User.findOne({email: members[i].email});

        if(!emailChecker)
        {
            if(matchRegex(members[i].email))
            {
                const {first_name, middle_name, last_name, student_number, user_type, email, password} = members[i];
                bcrypt.hash(password, 10).then((hash) =>{
                    User.create({
                        first_name: first_name,
                        middle_name: middle_name,
                        last_name: last_name,
                        student_number: student_number,
                        user_type: user_type,
                        email: email,
                        password: hash
                    })
                    .then(() => {
                        console.log({success: true});
                    })
                    .catch((err)=> {
                        console.log(err);
                    })
                })
            }
            else
            {
                console.log({success: false, email: members[i].email});
            }
        }
        else
        {
            console.log({success: false, email: members[i].email});
        }
    }

    res.send({message: "Successfully Uploaded"});
}

const addMember = async (req,res) => {

    const emailChecker = await User.findOne({email: req.body.email.toLowerCase()});

    //function for validating email format
    function matchRegex(email){
        return /^([a-z0-9]+)@up\.edu\.ph$/i.test(email);
    }

    ///check if email is already exisiting
    if(emailChecker)
    {
        return res.send({success: false, message: "Email Already Exists"});
    }
    else
    {
        //check if follows email format
        if(!matchRegex(req.body.email.toLowerCase())){
            res.send({success: false, message: "Invalid Email"});
        }
        else{
            const {first_name, middle_name, last_name, student_number, user_type, email, password} = req.body;
            bcrypt.hash(password, 10).then((hash) => {
                User.create({
                    first_name: first_name,
                    middle_name: middle_name,
                    last_name: last_name,
                    student_number: student_number,
                    user_type: user_type,
                    email: email,
                    password: hash
                })
                .then(() => {
                    res.send({success: true, message: "Added Successfully!"});
                })
                .catch((err) =>{
                    if (err){
                        res.send({success: false, message: "An Error Occured"});
                        console.log(err);
                    }
                })
            });
        }

    }
}

// const searchMember = async (req, res) => {
//     try{
//         const search = req.body.search;

//          // Assuming you have a User model imported and defined correctly

//         // Create the text index (if it doesn't exist yet)
//         await User.collection.createIndex({ first_name: 'text', middle_name: 'text', last_name: 'text', student_number: 'text', email: 'text' });

//            // Perform the text search
//         const searchResult = await User.find({ $text: { $search: search } });
//     }
//     catch (error) 
//     {
//         console.error('An error occurred:', error);
//         res.status(500).send('An error occurred'); 
//     }
// }

const getAllMembers = async (req, res) => {
    //find all members that is not an admin
    const members = await User.find({'user_type': {$ne: "Admin"}});
    res.send(members);
}

const editMember = async (req, res) => {
    try{
        const editMember = await User.findOne({email: req.body.email});

        editMember.first_name = req.body.first_name;
        editMember.middle_name = req.body.middle_name;
        editMember.last_name = req.body.last_name;
        editMember.user_type = req.body.user_type;

        await editMember.save();
        res.send({success: true, message: "Saved changes"});
    }
    catch(err)
    {
        console.log(err);
        res.send({success: false, message: "An error occured"});
    }
}

const deleteMember = async (req, res) => {
    try
    {
       const delMem = await User.findOne({email: req.body.email});
       const deleteResult = await User.deleteOne({"email": req.body.email});

        if (deleteResult.deletedCount == 1) 
        {
        res.send({ success: true, message: "Deleted successfully"})
        } 
        else 
        { 
        res.send({ success: false, message: "An error occured" })
        }

    //    if(delMem.user_type === "Candidate")
    //    {
    //         //also remove it to the candidate collection
    //    }
    //    else
    //    {
    //         //else delete
    //    }
        
    }
    catch(err)
    {   console.log(err);
        res.send({ success: false, message: "An error occured" })
    }
}

const getMemberIdByName = async (req,res) => {
    try
    {
        const name = req.body.fullName;

        await User.collection.createIndex({first_name: 'text', middle_name: 'text' , last_name: 'text'});

        //perform search
        const searchMember = await User.findOne({$text: {$search: name}});

        res.send(searchMember);
    }
    catch(err)
    {
        console.log(err);
    }
}

export {addMember, importCSV, getAllMembers, editMember, deleteMember, getMemberIdByName};