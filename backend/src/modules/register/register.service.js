const { database } = require("../../infra/database");
const bcrypt = require("bcrypt");

async function postRegister(data) {
  const { name, email, password } = data;
  const queryEmail = `
  SELECT 1 
  FROM users
  WHERE email = $1
  LIMIT 1`;

  const resultEmail = await database.query(queryEmail, [email]);
  const emailExists = resultEmail.rowCount > 0;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  if (emailExists === false) {
    const queryUser = `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
    const values = [name, email, passwordHash];
    const result = await database.query(queryUser, values);
    return result.rows[0];
  } else {
    return {
      error: "Email already exists",
    };
  }
}
module.exports = {
  postRegister,
};
