const { database } = require("../../infra/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function postLogin(data) {
  const { email, password } = data;
  const query = `
  SELECT id, email, password_hash
  FROM users
  WHERE email = $1
  `;
  const result = await database.query(query, [email]);
  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);

  if (valid === true) {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    return token;
  } else {
    return "Erro: email ou senha invalidos";
  }
}
module.exports = {
  postLogin,
};
