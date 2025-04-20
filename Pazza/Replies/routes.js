import * as repliesDao from "./dao.js";

export default function ReplyRoutes(app) {
  app.get("/api/discussions/:discussionId/replies", async (req, res) => {
    const { discussionId } = req.params;
    const replies = await repliesDao.findRepliesForDiscussion(discussionId);
    res.send(replies);
  });

  app.get("/api/replies/:replyId", async (req, res) => {
    const { replyId } = req.params;
    const reply = await repliesDao.getReply(replyId);
    res.send(reply);
  });

  app.post("/api/discussions/:discussionId/replies", async (req, res) => {
    const { discussionId } = req.params;
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      return res.status(401).send({ message: "Not logged in" });
    }
    
    const reply = {
      ...req.body,
      discussionId: discussionId,
      createdBy: currentUser._id,
    };
    
    try {
      const newReply = await repliesDao.createReply(reply);
      res.send(newReply);
    } catch (err) {
      res.status(400).send({error: "Error creating reply. Please ensure all required fields are filled."});
    }
  });

  app.delete("/api/replies/:replyId", async (req, res) => {
    const { replyId } = req.params;
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      return res.status(401).send({ message: "Not logged in" });
    }
    
    const reply = await repliesDao.getReply(replyId);
    
    if (!reply) {
      return res.status(404).send({ message: "Reply not found" });
    }
    
    if (reply.createdBy !== currentUser._id && 
        currentUser.role !== "FACULTY" && 
        currentUser.role !== "ADMIN") {
      return res.status(403).send({ message: "Insufficient permissions" });
    }
    
    const status = await repliesDao.deleteReply(replyId);
    res.send(status);
  });

  app.put("/api/replies/:replyId", async (req, res) => {
    const { replyId } = req.params;
    const replyUpdates = req.body;
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      return res.status(401).send({ message: "Not logged in" });
    }
    
    const reply = await repliesDao.getReply(replyId);
    
    if (!reply) {
      return res.status(404).send({ message: "Reply not found" });
    }
    
    if (reply.createdBy !== currentUser._id && 
        currentUser.role !== "FACULTY" && 
        currentUser.role !== "ADMIN") {
      return res.status(403).send({ message: "Insufficient permissions" });
    }
    
    const status = await repliesDao.updateReply(replyId, replyUpdates);
    res.send(status);
  });

  app.put("/api/replies/:replyId/good-comment", async (req, res) => {
    const { replyId } = req.params;
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      return res.status(401).send({ message: "Not logged in" });
    }
    
    const status = await repliesDao.incrementGoodComment(replyId);
    res.send(status);
  });
}