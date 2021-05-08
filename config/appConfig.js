require('dotenv').config();


module.exports={
    "PORT": process.env.PORT || 3030,
    "NODE_ENV": process.env.NODE_ENV,
    "APP_URL":process.env.APP_URL,
    "DB_USER":process.env.DB_USER,
    "DB_PASSWORD":process.env.DB_PASSWORD,
    "DB_HOST":process.env.DB_HOST,
    "DB_PORT":process.env.DB_PORT,
    "DB_NAME":process.env.DB_NAME,
    "PROD_DB_URL":process.env.DATABASE_URL
}