import * as answersDao from "./dao.js";

export default function AnswersRoutes(app) {
  app.get("/api/answers/:postId/student", async (req, res) => {
    const { postId } = req.params;
    const answers = await answersDao.findStudentAnswersForPost(postId);
    res.json(answers);
  });

  app.get("/api/answers/:postId/instructor", async (req, res) => {
    const { postId } = req.params;
    const answers = await answersDao.findInstructorAnswersForPost(postId);
    res.json(answers);
  });

  app.get("/api/answers/:postId/course", async (req, res) => {
    const { cid } = req.params;
    const answers = await answersDao.findAnswersForCourse(cid);
    res.json(answers);
  });

  app.get("/api/answers/:postId/course/student", async (req, res) => {
    const { cid } = req.params;
    const answers = await answersDao.findStudentAnswersForCourse(cid);
    res.json(answers);
  });

  app.get("/api/answers/:postId/course/instructor", async (req, res) => {
    const { cid } = req.params;
    const answers = await answersDao.findInstructorAnswersForCourse(cid);
    res.json(answers);
  });

  app.get("/api/answers/:answerId", async (req, res) => {
    const { answerId } = req.params;
    const answer = await answersDao.getAnswer();
    res.json(answer);
  });

  app.post("/api/answers/:postId", async (req, res) => {
    const { postId } = req.params;
    const answer = {
      ...req.body,
      post: postId,
    };
    try {
      const newAnswer = await answersDao.createAnswer(answer);
      res.send(newAnswer);
    } catch (err) {
      res.status(400).send({error: "Error creating answer. Ensure required fields are present."});
    }
  });

  app.put("/api/answers/:answerId", async (req, res) => {
    const { answerId } = req.params;
    const answerUpdates = req.body;
    const status = await answersDao.updateAnswer(answerId, answerUpdates);
    res.send(status);
  });

  app.delete("/api/answers/:answerId", async (req, res) => {
    const { answerId } = req.params;
    const status = await answersDao.deleteAnswer(answerId);
    res.send(status);
  });
}
