import mongoose from "mongoose";
import { UserSchema } from "../models/user.js";
import bcrypt from "bcrypt";

const User = mongoose.model("User", UserSchema);

const addMember = async (req,res) => {

    const emailChecker = await User.findOne({email: req.body.email.toLowerCase()});

    //function for validating email format
    function matchRegex(email){
        return /^([a-z0-9]+)@up\.edu\.ph$/i.test(email);
    }

    ///check if email is already exisiting
    if(emailChecker)
    {
        return res.send({emailExist: true});
    }
    else
    {
        //check if follows email format
        if(!matchRegex(req.body.email.toLowerCase())){
            res.send({success: false});
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
                    res.send({success: true});
                })
                .catch((err) =>{
                    if (err){
                        res.send({success: false});
                        console.log(err);
                    }
                })
            });
        }

    }
}

export {addMember};