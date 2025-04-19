import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findDiscussionPosts(parentId) {
  return model.find({parent: parentId});
}

export function getDiscussionPost(discussionPostId) {
  return model.findOne({_id: discussionPostId});
}

export function createDiscussionPost(discussionPost) {
  const newDiscussionPost = { ...discussionPost, _id: uuidv4(), createdAt: new Date() };
  return model.create(newDiscussionPost);
}

export function updateDiscussionPost(discussionPostId, discussionPostUpdates) {
  return model.updateOne({ _id: discussionPostId }, { $set: discussionPostUpdates });
}

export function deleteDiscussionPost(discussionPostId) {
  return model.deleteOne( {_id: discussionPostId });
}


