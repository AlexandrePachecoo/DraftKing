const { database } = require("../../src/infra/database");
require("dotenv").config();

test("Get status returns 200 OK", async () => {
  const response = await fetch("http://localhost:3000/status");
  const responseBody = await response.json();
  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();

  expect(responseBody.update_at).toEqual(parsedUpdateAt);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.version).toEqual("18.1");
  expect(response.status).toBe(200);
});

test("Database connection works", async () => {
  const response = await database.query("SELECT 2+15 AS result;");
  expect(response.rows[0].result).toBe(17);
});
