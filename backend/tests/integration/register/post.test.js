const { database } = require("../../../src/infra/database");

test("POST to register returns 200 OK", async () => {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "teste",
        email: "teste@teste.com",
        password: "12345678",
      }),
    });
    const responseBody = await response.json();
    expect(responseBody.name).toBe("teste");
  } finally {
    await database.query(`DELETE FROM users WHERE email = 'teste@teste.com';`);
  }
});
