//user schema

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { url } from "node:inspector";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true,
        maxLength: [50, "Name should not exceed 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [6, "Password should be at least 6 characters long"],
        select: false, 
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords do not match",
        },
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide your phone number"],
    },
    role: {
        type: String,
        enum: ["User", "admin"],
        default: "User",
    },
    avatar: {
        url: { type: String},
        public_id: { type: String },
    },
    passwordChangedAt:{
        type: Date,
    },
    passwordResetToken:{
        type: String,
        select: false,
        index: true
    },
    passwordResetExpires:{
         type: String,
        select: false,
    },       

},
{timestamps: true}
);

UserSchema.set("toJSON", {
    transform:function(doc, ret) { 
        delete ret.password;
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.__v;
        return ret;
    }
});

//password logic
//Hashing
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    
});

//login check
UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

//
UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}

//forget password
UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken;
}

const User = mongoose.model("User", UserSchema);

export {User};
