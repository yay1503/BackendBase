import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import connectDB from "./db";


connectDB()

/*

import express from "express"
const app = express()

;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
        app.on("error", (error) => {
            console.log("Err: "), error;
            
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })
    }catch(error){
        console.error("error")
    }
})()

*/

