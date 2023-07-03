import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {UserSchema} from "../models/user.js";
import jwt from 'jsonwebtoken';


const User = mongoose.model("User", UserSchema);


const login = async (req,res) => {
    //get email and password from the body
    const email = req.body.email.trim();
    const password = req.body.password;

    //check if email exist
    const user = await User.findOne({email: email});

    //SCENARIO 1: FAIL - email does not exist
    if(!user)
    {
        return res.send({success: false}) //change to string prompt
    }
    else
    {
        //check if password matches
        const dbPassword = user.password;

        //use bcrypt to compare password
        bcrypt.compare(password, dbPassword).then((match) => {
            //SCENARIO 2: FAIL - wrong password
            if(!match)
            {
                return res.send({success: false});
            }
            else
            {
                //SCENARIO 3: SUCCESS
                const tokenPayLoad = {
                    _id: user._id
                };

                const token = jwt.sign(tokenPayLoad, process.env.TOKEN_STRING);

                //return token to the client
                return res.send({success: true, token, username: user.last_name});
            }
        })
    }
}

const checkIfLoggedIn = async (req,res) => {
    if (!req.cookies || !req.cookies.authToken) {
        // FAIL Scenario 1 - No cookies / no authToken cookie sent
        return res.send({ isLoggedIn: false });
      }
    
      try {
        // try to verify the token
        const tokenPayload = jwt.verify(req.cookies.authToken, process.env.TOKEN_STRING);
    
        // check if the _id in the payload is an existing user id
        const user = await User.findById(tokenPayload._id)
    
        if (user) {
          // SUCCESS Scenario - User is found
          return res.send({ isLoggedIn: true })
        } else {
          // FAIL Scenario 2 - Token is valid but user id not found
          return res.send({ isLoggedIn: false })
        }
      } catch {
        // FAIL Scenario 3 - Error in validating token / Token is not valid
        return res.send({ isLoggedIn: false });
      }
}

const userChecker = async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  try{
    if(user.user_type == "Admin")
    {
      return res.send({userType: user.user_type});
    }
    else{
      return res.send({userType: user.user_type});
    }
  } 
  catch (err)
  {
    console.log(err);cd
  }

}

export {login, checkIfLoggedIn, userChecker};