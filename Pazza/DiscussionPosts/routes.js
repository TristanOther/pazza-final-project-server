import * as discussionPostsDao from "./dao.js";

export default function DiscussionPostRoutes(app) {
  app.get("/api/discussionpost/:parentId", async (req, res) => {
    const { parentId } = req.params;
    const discussionPosts = await discussionPostsDao.findDiscussionPosts(parentId);
    res.json(discussionPosts);
  });

  app.get("/api/discussionpost/:discussionPostId", async (req, res) => {
    const { discussionPostId } = req.params;
    const discussionPost = await discussionPostsDao.getDiscussionPost(discussionPostId);
    res.json(discussionPost);
  });

  app.post("/api/discussionpost/:parentId", async (req, res) => {
    const { parentId } = req.params;
    const discussionPost = {
      ...req.body,
      parent: parentId,
    };
    try {
      const newDiscussionPost = await discussionPostsDao.createDiscussionPost(discussionPost);
      res.send(newDiscussionPost);
    } catch (err) {
      res.status(400).send({error: "Error creating discussion post. Ensure required fields are present."});
    }
  });

  app.put("/api/discussionpost/:discussionPostId", async (req, res) => {
    const { discussionPostId } = req.params;
    const discussionPostUpdates = req.body;
    const status = await discussionPostsDao.updateDiscussionPost(discussionPostId, discussionPostUpdates);
    res.send(status);
  });

  app.delete("/api/discussionpost/:discussionPostId", async (req, res) => {
    const deleteChildren = async (dpid) => {
      const children = await discussionPostsDao.findDiscussionPosts(dpid);
      children.map(async (child) => {
        await discussionPostsDao.deleteDiscussionPost(child._id);
      });
    }
    
    const { discussionPostId } = req.params;
    deleteChildren(discussionPostId);
    const status = await discussionPostsDao.deleteDiscussionPost(discussionPostId);
    res.send(status);
  });
}
