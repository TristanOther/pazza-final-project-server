import * as discussionsDao from "./dao.js";

export default function DiscussionRoutes(app) {
  app.get("/api/posts/:postId/discussions", async (req, res) => {
    const { postId } = req.params;
    const discussions = await discussionsDao.findDiscussionsForPost(postId);
    res.send(discussions);
  });

  app.get("/api/discussions/:discussionId", async (req, res) => {
    const { discussionId } = req.params;
    const discussion = await discussionsDao.getDiscussion(discussionId);
    res.send(discussion);
  });

  app.post("/api/posts/:postId/discussions", async (req, res) => {
    const { postId } = req.params;
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      return res.status(401).send({ message: "Not logged in" });
    }
    
    const discussion = {
      ...req.body,
      postId: postId,
      createdBy: currentUser._id,
    };
    
    try {
      const newDiscussion = await discussionsDao.createDiscussion(discussion);
      res.send(newDiscussion);
    } catch (err) {
      res.status(400).send({error: "Error creating discussion. Please ensure all required fields are filled."});
    }
  });

  app.delete("/api/discussions/:discussionId", async (req, res) => {
    const { discussionId } = req.params;
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      return res.status(401).send({ message: "Not logged in" });
    }
    
    const discussion = await discussionsDao.getDiscussion(discussionId);
    
    if (!discussion) {
      return res.status(404).send({ message: "Discussion not found" });
    }
    
    if (discussion.createdBy !== currentUser._id && 
        currentUser.role !== "FACULTY" && 
        currentUser.role !== "ADMIN") {
      return res.status(403).send({ message: "Insufficient permissions" });
    }
    
    const status = await discussionsDao.deleteDiscussion(discussionId);
    res.send(status);
  });

  app.put("/api/discussions/:discussionId", async (req, res) => {
    const { discussionId } = req.params;
    const discussionUpdates = req.body;
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      return res.status(401).send({ message: "Not logged in" });
    }
    
    const discussion = await discussionsDao.getDiscussion(discussionId);
    
    if (!discussion) {
      return res.status(404).send({ message: "Discussion not found" });
    }
    
    if (discussion.createdBy !== currentUser._id && 
        currentUser.role !== "FACULTY" && 
        currentUser.role !== "ADMIN") {
      return res.status(403).send({ message: "Insufficient permissions" });
    }
    
    const status = await discussionsDao.updateDiscussion(discussionId, discussionUpdates);
    res.send(status);
  });

  app.put("/api/discussions/:discussionId/resolve", async (req, res) => {
    const { discussionId } = req.params;
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      return res.status(401).send({ message: "Not logged in" });
    }
    
    const discussion = await discussionsDao.getDiscussion(discussionId);
    
    if (!discussion) {
      return res.status(404).send({ message: "Discussion not found" });
    }
    
    if (discussion.createdBy !== currentUser._id && 
        currentUser.role !== "FACULTY" && 
        currentUser.role !== "ADMIN") {
      return res.status(403).send({ message: "Insufficient permissions" });
    }
    
    const status = await discussionsDao.toggleResolved(discussionId);
    res.send(status);
  });

  app.put("/api/discussions/:discussionId/helpful", async (req, res) => {
    const { discussionId } = req.params;
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      return res.status(401).send({ message: "Not logged in" });
    }
    
    const status = await discussionsDao.incrementHelpful(discussionId);
    res.send(status);
  });
}