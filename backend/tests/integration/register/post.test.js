const { database } = require("../../../src/infra/database");

test("POST to register returns 200 OK", async () => {
  try {
    const resultRegister = await register();
    const responseRegisterBody = await resultRegister.json();
    expect(responseRegisterBody.name).toBe("teste");

    const resultLogin = await login();
    const responseLoginBody = await resultLogin.json();

    expect(responseLoginBody).toContain("eyJh");
  } finally {
    await database.query(`DELETE FROM users WHERE email = 'teste@teste.com';`);
  }
});

async function register() {
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
  return response;
}

async function login() {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "teste@teste.com",
      password: "12345678",
    }),
  });
  return response;
}
