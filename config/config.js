require('dotenv').config();

const config = {
  remoteDB: process.env.REMOTE_DB || false,
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
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001
  },
  cacheService: {
    host: process.env.CACHE_HOST || 'localhost',
    port: process.env.CACHE_PORT || 3003

  },
  post: {
    port: process.env.POST_PORT || 3002
  }
}


module.exports = {config}
