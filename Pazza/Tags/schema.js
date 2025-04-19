import mongoose from "mongoose";
const tagSchema = new mongoose.Schema({
    _id:      { type: String, required: true},
    name:     { type: String, required: true},
    course:   { type: String, required: true},
    priority: { type: Number, required: true, default: 1 },
  },
  { collection: "pazza-tags" }
);
export default tagSchema;