import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function getEnrollments() {
  const { enrollments } = Database;
  return enrollments;
}

export function findEnrollmentsForCourse(courseId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.course === courseId);
}

export function enrollUserInCourse(userId, courseId) {
  const newEnrollment = { user: userId, course: courseId, _id: uuidv4() };
  Database.enrollments = [...Database.enrollments, newEnrollment];
  return newEnrollment;
}

export function unenrollUserFromCourse(enrollmentId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter((enrollment) => enrollment._id !== enrollmentId);
}