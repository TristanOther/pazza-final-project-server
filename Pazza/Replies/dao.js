import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findRepliesForDiscussion(discussionId) {
  return model.find({discussionId: discussionId}).sort({ createdAt: 1 });
}

export function getReply(replyId) {
  return model.findOne({_id: replyId});
}

export function createReply(reply) {
  const now = new Date();
  const newReply = { 
    ...reply, 
    _id: uuidv4(), 
    createdAt: now,
    updatedAt: now,
    goodCommentCount: 0
  };
  return model.create(newReply);
}

export function deleteReply(replyId) {
  return model.deleteOne({_id: replyId});
}

export function updateReply(replyId, replyUpdates) {
  const updates = { 
    ...replyUpdates, 
    updatedAt: new Date() 
  };
  return model.updateOne({ _id: replyId }, { $set: updates });
}

export function incrementGoodComment(replyId) {
  return model.updateOne(
    { _id: replyId },
    { 
      $inc: { goodCommentCount: 1 },
      $set: { updatedAt: new Date() }
    }
  );
}