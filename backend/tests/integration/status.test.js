const { database } = require("../../src/infra/database");

test("Get status returns 200 OK", async () => {
  const response = await fetch("http://localhost:3000/status");
  expect(response.status).toBe(200);
});

test("Database connection works", async () => {
  const response = await database.query("SELECT 2+15 AS result;");
  expect(response.rows[0].result).toBe(17);
});
