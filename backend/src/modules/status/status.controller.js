const service = require("./status.service");

module.exports = {
  async getStatus(require, response, next) {
    try {
      const status = await service.getStatus();
      return response.status(200).json(status);
    } catch (error) {
      return next(error);
    }
  },
};
