require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  jwtsecret: process.env.JWT_SECRET,
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    db_port: process.env.MYSQL_DATABASE_PORT,
    dbUrl: process.env.MYSQL_DBURL || '',
  }
}


module.exports = {config}
