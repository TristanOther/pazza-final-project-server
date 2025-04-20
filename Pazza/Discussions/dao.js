import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findDiscussionsForPost(postId) {
  return model.find({postId: postId}).sort({ createdAt: -1 });
}

export function getDiscussion(discussionId) {
  return model.findOne({_id: discussionId});
}

export function createDiscussion(discussion) {
  const now = new Date();
  const newDiscussion = { 
    ...discussion, 
    _id: uuidv4(), 
    createdAt: now,
    updatedAt: now,
    resolved: false,
    helpfulCount: 0
  };
  return model.create(newDiscussion);
}

export function deleteDiscussion(discussionId) {
  return model.deleteOne({_id: discussionId});
}

export function updateDiscussion(discussionId, discussionUpdates) {
  const updates = { 
    ...discussionUpdates, 
    updatedAt: new Date() 
  };
  return model.updateOne({ _id: discussionId }, { $set: updates });
}

export function toggleResolved(discussionId) {
  return getDiscussion(discussionId).then(discussion => {
    return model.updateOne(
      { _id: discussionId }, 
      { $set: { 
          resolved: !discussion.resolved,
          updatedAt: new Date()
        } 
      }
    );
  });
}

export function incrementHelpful(discussionId) {
  return model.updateOne(
    { _id: discussionId },
    { 
      $inc: { helpfulCount: 1 },
      $set: { updatedAt: new Date() }
    }
  );
}