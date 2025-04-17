import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    _id:        { type: String,   required: true},
    title:      { type: String,   required: true},
    postType:   { type: String,   required: true},
    content:    { type: String,   required: true},
    course:     { type: String,   required: true},
    createdBy:  { type: String,   required: true},
    createdAt:  { type: Date,     required: true},
    instructor: { type: Boolean,  required: true,  default: false},
    tags:       { type: [String], required: true,  default: []},
    readBy:     { type: [String], required: true,  default: []},
    viewedBy:   { type: [String], required: true,  default: []},
    viewableBy: { type: [String], required: true,  default: []},
  }, 
  { collection: "pazza-posts" }
);
export default postSchema;