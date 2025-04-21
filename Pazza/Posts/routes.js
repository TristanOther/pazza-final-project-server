import * as postsDao from "./dao.js";
import * as answersDao from "../Answers/dao.js";
import * as discussionPostsDao from "../DiscussionPosts/dao.js";

export default function PostRoutes(app) {
  app.get("/api/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const post = await postsDao.getPost(postId);
    res.send(post);
  });

  app.delete("/api/posts/:postId", async (req, res) => {
    const { postId } = req.params;

    const answers = await answersDao.findAnswersForPost(postId);
    answers.map(async (a) => {
      await answersDao.deleteAnswer(a);
    });

    const deleteDiscussionPosts = async (parentId) => {
      const discussionPosts = await discussionPostsDao.findDiscussionPosts(parentId);
      discussionPosts.map(async (dp) => {
        deleteDiscussionPosts(dp._id);
        await discussionPostsDao.deleteDiscussionPost(dp._id);
      });
    }
    deleteDiscussionPosts(postId);

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
