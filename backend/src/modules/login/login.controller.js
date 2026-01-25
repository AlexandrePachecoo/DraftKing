const service = require("./login.service");

module.exports = {
  async postLogin(req, res, next) {
    try {
      const status = await service.postLogin(req.body);

      return res.status(200).json(status);
    } catch (error) {
      return next(error);
    }
  },
};
