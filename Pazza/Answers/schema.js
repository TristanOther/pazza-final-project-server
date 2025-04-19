import mongoose from "mongoose";
const answerSchema = new mongoose.Schema({
    _id:        { type: String,   required: true },
    content:    { type: String,   required: true },
    post:       { type: String,   required: true },
    createdBy:  { type: String,   required: true },
    createdAt:  { type: Date,     required: true },
    instructor: { type: Boolean,  required: true,  default: false },
  }, 
  { collection: "pazza-answers" }
);
export default answerSchema;