import mongoose from "mongoose";
const discussionPostSchema = new mongoose.Schema({
    _id:        { type: String,   required: true },
    content:    { type: String,   required: true },
    parent:     { type: String,   required: true },
    createdBy:  { type: String,   required: true },
    createdAt:  { type: Date,     required: true },
    resolved:   { type: Boolean,  required: true,  default: false },
  },
  { collection: "pazza-discussion-posts" }
);
export default discussionPostSchema;