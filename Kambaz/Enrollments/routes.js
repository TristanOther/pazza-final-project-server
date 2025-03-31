import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.delete("/api/enrollments/:enrollmentId", async (req, res) => {
    const { enrollmentId } = req.params;
    const status = await enrollmentsDao.unenrollUserFromCourse(enrollmentId);
    res.send(status);
  });

  app.get("/api/enrollments", async (req, res) => {
    const status = await enrollmentsDao.getEnrollments();
    res.send(status);
  });
}
