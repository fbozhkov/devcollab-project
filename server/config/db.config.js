import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_TEST_NAME, NODE_ENV } = process.env;

const config = {
  "development": {
    "username": DB_USERNAME,
      "password": DB_PASSWORD,
    "database": "sequelize_database_development",
      "host": DB_HOST
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_TEST_NAME,
    "host": DB_HOST
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "sequelize_database_production",
    "host": "127.0.0.1"
  }
}

const dbUrl = () => {
  if (NODE_ENV === 'production') {
    return process.env.DATABASE_URL;
  }
  else {
    return `postgres://${config[NODE_ENV].username}:${config[NODE_ENV].password}@${config[NODE_ENV].host}/${config[NODE_ENV].database}`;
  }
}

const db = {};
const sequelize = new Sequelize(dbUrl(), {
  dialect: 'postgres',
  ...(NODE_ENV === 'production' && 
  {dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  }}),
  operatorsAliases: 0,
  

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
console.log(`NODE_ENV = ${process.env.NODE_ENV}`)

try {
  await sequelize.authenticate();
  console.log('Connection with database has been established successfully.');
  console.log(`NODE_ENV = ${process.env.NODE_ENV} Database: ${config[NODE_ENV]}`)
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db
