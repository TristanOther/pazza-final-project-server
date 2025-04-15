import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findTagsForCourse(courseId) {
  return model.find({course: courseId}).sort({ priority: 1 });
}

export function createTag(tag) {
  const newTag = { ...tag, _id: uuidv4() };
  return model.create(newTag);
}

export function deleteTag(tagId) {
  return model.deleteOne( {_id: tagId });
}

export function updateTag(tagId, tagUpdates) {
  return model.updateOne({ _id: tagId }, { $set: tagUpdates });
}
