import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as postsDao from "../../Pazza/Posts/dao.js";
import * as tagsDao from "../../Pazza/Tags/dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });

  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }
    res.json(course);
  }); 

  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });

  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
  });

  app.post("/api/courses/:courseId/enrollments/:userId", async (req, res) => {
    const { courseId, userId } = req.params;
    const enrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  });

  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  }; 
  app.get("/api/courses/:cid/users", findUsersForCourse);

  app.get("/api/courses/:courseId/posts", async (req, res) => {
    const { courseId } = req.params;
    const posts = await postsDao.findPostsForCourse(courseId);
    res.json(posts);
  });

  app.post("/api/courses/:courseId/posts", async (req, res) => {
    const { courseId } = req.params;
    const post = {
      ...req.body,
      course: courseId,
    };
    try {
      const newPost = await postsDao.createPost(post);
      res.send(newPost);
    } catch (err) {
      res.status(400).send({error: "Error creating post. Ensure required fields are present."});
    }
  });

  app.get("/api/courses/:courseId/tags", async (req, res) => {
    const { courseId } = req.params;
    const tags = await tagsDao.findTagsForCourse(courseId);
    res.json(tags);
  });

  app.post("/api/courses/:courseId/tags", async (req, res) => {
    const { courseId } = req.params;
    const tag = {
      ...req.body,
      course: courseId,
    };
    try {
      const newTag = await tagsDao.createPost(tag);
      res.send(newTag);
    } catch (err) {
      res.status(400).send({error: "Error creating tag. Ensure required fields are present."});
    }
  });
}
