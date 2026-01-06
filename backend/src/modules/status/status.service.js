require("dotenv").config();
const { database } = require("../../infra/database");

async function getStatus() {
  const updateAt = new Date().toISOString();

  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(maxConnectionsResult.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;
  const openedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnections = openedConnectionsResult.rows[0].count;

  const versionPostgresResult = await database.query("SHOW server_version;");
  const versionPostgres = versionPostgresResult.rows[0].server_version;

  return {
    update_at: updateAt,
    dependencies: {
      database: {
        max_connections: maxConnections,
        opened_connections: openedConnections,
        version: versionPostgres,
      },
    },
  };
}
module.exports = {
  getStatus,
};
