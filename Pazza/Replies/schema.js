import mongoose from "mongoose";
const replySchema = new mongoose.Schema({
    _id:              { type: String,   required: true },
    discussionId:     { type: String,   required: true },
    content:          { type: String,   required: true },
    createdBy:        { type: String,   required: true },
    createdAt:        { type: Date,     required: true },
    updatedAt:        { type: Date,     required: true },
    goodCommentCount: { type: Number,   default: 0 }
  }, 
  { collection: "pazza-replies" }
);
export default replySchema;