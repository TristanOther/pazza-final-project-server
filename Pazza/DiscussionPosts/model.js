import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("DiscussionPostModel", schema);
export default model;