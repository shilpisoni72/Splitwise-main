module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "PaaiMa@1509",
  DB: "db_splitwise",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
