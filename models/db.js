const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.MARIA_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 15, // 최대 연결 개수 설정
    idleTimeout: 10000, // 유휴 상태 유지 시간 (ms)
    acquireTimeout: 10000, // 연결 대기 시간 (ms)
    dateStrings: true,
});

module.exports = pool;
