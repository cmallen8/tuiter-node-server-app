import mongoose from "mongoose";
import e from "express";

const schema = mongoose.Schema({
    tuit: String,
    topic: String,
    userName: String,
    handle: String,
    time: String,
    image: String,
    title: String,
    replies: Number,
    retuits: Number,
    likes: Number,
    dislikes: Number,
    liked: Boolean,
}, {collection: 'tuits'});
export default schema;