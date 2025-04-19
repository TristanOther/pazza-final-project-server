import * as tagsDao from "./dao.js";

export default function TagRoutes(app) {
  app.delete("/api/tags/:tagId", async (req, res) => {
    const { tagId } = req.params;
    const status = await tagsDao.deleteTag(tagId);
    res.send(status);
  });

  app.put("/api/tags/:tagId", async (req, res) => {
    const { tagId } = req.params;
    const tagUpdates = req.body;
    const status = await tagsDao.updateTag(tagId, tagUpdates);
    res.send(status);
  });
}
