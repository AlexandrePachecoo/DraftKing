const service = require("./leagues.service");

module.exports = {
  async postCreateLeague(req, res, next) {
    try {
      const userId = req.user.id;
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({
          error: "League name is required",
        });
      }

      const result = await service.createLeague(userId, name);

      if (result.error) {
        return res.status(400).json(result);
      }

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  },
};
