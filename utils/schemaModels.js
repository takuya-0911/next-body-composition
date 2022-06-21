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
    },
    birthday:{
        type: Date
    }
});

const InnerScanSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    ScanDate:{
        type: Date,
        required: true,
        unique: true
    },
    height:{
        type: Schema.Types.Decimal128,
        required: true
    },
    weight:{
        type: Schema.Types.Decimal128,
        required: true
    },
    body_fat: Schema.Types.Decimal128,
    fat_mass: Schema.Types.Decimal128,
    lean_body_mass: Schema.Types.Decimal128,
    muscle_mass: Schema.Types.Decimal128,
    body_water: Schema.Types.Decimal128,
    total_body_water: Schema.Types.Decimal128,
    bone_mass: Schema.Types.Decimal128,
    bmr: Number,
    visceral_fat_level: Number,
    leg_score: Number,
    bmi: Schema.Types.Decimal128,
    standard_weight: Schema.Types.Decimal128,
    degree_of_obesity: Schema.Types.Decimal128,
});

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export const InnerScanModel = mongoose.models.InnerScan || mongoose.model("InnerScan", InnerScanSchema);