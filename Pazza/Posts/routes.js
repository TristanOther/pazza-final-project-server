import * as postsDao from "./dao.js";

export default function PostRoutes(app) {
  app.get("/api/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const post = await postsDao.getPost(postId);
    res.send(post);
  });

  app.delete("/api/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const status = await postsDao.deletePost(postId);
    res.send(status);
  });

  app.put("/api/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const postUpdates = req.body;
    const status = await postsDao.updatePost(postId, postUpdates);
    res.send(status);
  });
}
