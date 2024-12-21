const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.MARIA_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 15, // 최대 연결 개수 설정
});

// 데이터베이스 연결 테스트
(async () => {
    console.log('Host:', process.env.MARIA_HOST);
    try {
        const connection = await pool.getConnection();
        console.log('MariaDB 데이터베이스에 연결되었습니다.');
        connection.release(); // 연결 해제
    } catch (err) {
        console.error('데이터베이스 연결 실패:', err);
    }
})();

module.exports = pool;
