const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

// pool.query를 Promise로 변환
pool.query = util.promisify(pool.query);

// 데이터베이스 연결 확인 (커넥션 풀 사용 시 필요 없음)
pool.getConnection((err, connection) => {
    if (err) {
        console.error('데이터베이스 연결 실패:', err);
        return;
    }
    console.log('데이터베이스에 연결되었습니다.');
    connection.release(); // 사용 후 연결 해제
});

module.exports = pool;
