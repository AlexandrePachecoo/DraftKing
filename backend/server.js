const app = require("./app");
const service = require("./src/modules/status/status.service");

const PORT = 3000;

app.listen(PORT, async () => {
  const status = await service.getStatus();
  console.log(`Server is running on port ${PORT}`);
  console.log(`Status: ${JSON.stringify(status)}`);
});
