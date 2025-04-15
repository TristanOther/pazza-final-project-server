import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findPostsForCourse(courseId) {
  return model.find({course: courseId});
}

export function createPost(post) {
  const newPost = { ...post, _id: uuidv4(), createdAt: new Date() };
  return model.create(newPost);
}

export function deletePost(postId) {
  return model.deleteOne( {_id: postId });
}

export function updatePost(postId, postUpdates) {
  return model.updateOne({ _id: postId }, { $set: postUpdates });
}
