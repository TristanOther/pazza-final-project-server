import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findStudentAnswersForPost(postId) {
  return model.find({post: postId, instructor: false});
}

export function findInstructorAnswersForPost(postId) {
  return model.find({post: postId, instructor: true});
}

export function getAnswer(answerId) {
  return model.findOne({_id: answerId});
}

export function createAnswer(answer) {
  const newAnswer = { ...answer, _id: uuidv4(), createdAt: new Date() };
  return model.create(newAnswer);
}

export function updateAnswer(answerId, answerUpdates) {
  return model.updateOne({ _id: answerId }, { $set: answerUpdates });
}

export function deleteAnswer(answerId) {
  return model.deleteOne( {_id: answerId });
}


