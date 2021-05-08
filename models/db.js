const Pool = require('pg').Pool;
const appConfig = require('../config/appConfig');

const devConfig = {
    user: appConfig.DB_USER,
    password: appConfig.DB_PASSWORD,
    host: appConfig.DB_HOST,
    port: appConfig.DB_PORT,
    database: appConfig.DB_NAME
}

const productionConfig = {
    connectionString: appConfig.PROD_DB_URL,
    ssl: { rejectUnauthorized: false }
}

const config = appConfig.NODE_ENV==='production' ? productionConfig : devConfig;

const pool = new Pool(config);


module.exports = pool;