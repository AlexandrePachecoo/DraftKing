const { database } = require("../../infra/database");

async function createLeague(userId, leagueName) {
  // Verificar se a league já existe com esse nome
  const queryCheckLeague = `
    SELECT 1 
    FROM leagues
    WHERE name = $1
    LIMIT 1`;

  const resultCheckLeague = await database.query(queryCheckLeague, [leagueName]);
  const leagueExists = resultCheckLeague.rowCount > 0;

  if (leagueExists) {
    return {
      error: "League with this name already exists",
    };
  }

  // Verificar se o usuário existe
  const queryCheckUser = `
    SELECT id
    FROM users
    WHERE id = $1
    LIMIT 1`;

  const resultCheckUser = await database.query(queryCheckUser, [userId]);
  
  if (resultCheckUser.rowCount === 0) {
    return {
      error: "User not found",
    };
  }

  // Criar a league
  const queryCreateLeague = `
    INSERT INTO leagues (name)
    VALUES ($1)
    RETURNING *`;

  const resultLeague = await database.query(queryCreateLeague, [leagueName]);
  const league = resultLeague.rows[0];

  // Adicionar o usuário como owner/admin da league
  const queryAddUserLeague = `
    INSERT INTO users_league (id_user, id_league, cargo)
    VALUES ($1, $2, $3)
    RETURNING *`;

  const resultUserLeague = await database.query(queryAddUserLeague, [
    userId,
    league.id,
    "owner",
  ]);

  return {
    league: league,
    user_league: resultUserLeague.rows[0],
  };
}

module.exports = {
  createLeague,
};
