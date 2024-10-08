const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Vault = require('./models/vault')(sequelize, Sequelize.DataTypes);

async function main() {
  await sequelize.sync({ force: true });  // This will create or overwrite the tables
  await Vault.create({ name: 'Anastasia', passcode: 1111, content: "I love fish" });
  const vaults = await Vault.findAll();
  console.log(vaults);
}

main();