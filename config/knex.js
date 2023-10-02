const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./config/mini_cart.db",
  },
  useNullAsDefault: true,
});

module.exports = knex;
