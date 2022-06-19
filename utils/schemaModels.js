'use strict';
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    sex:{
        type: String
    }
});

const InnerScanSchema = new Schema({
    age:{
        type: "int",
    },

});

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export const InnerScanModel = mongoose.models.InnerScan || mongoose.model("InnerScan", InnerScanSchema);