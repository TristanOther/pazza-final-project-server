import mongoose from "mongoose";
const discussionSchema = new mongoose.Schema({
    _id:          { type: String,   required: true },
    postId:       { type: String,   required: true },
    content:      { type: String,   required: true },
    createdBy:    { type: String,   required: true },
    createdAt:    { type: Date,     required: true },
    updatedAt:    { type: Date,     required: true },
    resolved:     { type: Boolean,  default: false },
    helpfulCount: { type: Number,   default: 0 }
  }, 
  { collection: "pazza-discussions" }
);
export default discussionSchema;