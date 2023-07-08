import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {UserSchema} from "../models/user.js";
import jwt from 'jsonwebtoken';

const User = mongoose.model("User", UserSchema);

const changePassword = async (req,res) => {
    const user = await User.findOne({email: req.body.email});
    const password =  req.body.password;
    const dbPassword = user.password;

    bcrypt.compare(password, dbPassword).then((match) => {
        //SCENARIO 1: Passeords do not match
        if(!match)
        {
            res.send({success: false, message: "Incorrect Password"});
        }
        else
        {
            //SCENARIO 2: new password and retype password does not match
            if(req.body.newPassword != req.body.retypePass)
            {
                res.send({success: false, message: "New Password Mismatch"});
            }
            else
            {
            //SCENARIO 3: Success 
                bcrypt.hash(req.body.newPassword, 10).then((hash)=> {
                    user.password = hash;
                })
                .then(()=> {
                    user.save();
                    res.send({success: true, message: "Password Updated!"});
                })
                .catch((err) => {
                    if(err)
                    {
                        res.send({success: false});
                        console.log(err);
                    }
                })
            }
        }
    })
}

export {changePassword};