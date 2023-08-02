import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import setUpRoutes from "./routes.js";

dotenv.config();

// initialize the server
const app = express();

app.use(express.urlencoded({ limit: '50mb',extended: true }));
app.use(express.json({limit: '50mb'}));

// allow CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Accept,Content-Type,X-Requested-With,Cookie");
    res.setHeader("Access-Control-Allow-Credentials","true");
    next();
});

// setup routes
setUpRoutes(app);


//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log('listening on PORT', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })