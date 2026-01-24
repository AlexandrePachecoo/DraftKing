const service = require("./register.service");

module.exports = {
  async postRegister(req, res, next) {
    try {
      const status = await service.postRegister(req.body);

      return res.status(200).json(status);
    } catch (error) {
      return next(error);
    }
  },
};
