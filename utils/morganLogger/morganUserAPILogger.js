const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const moment = require('moment'); // moment.js

// 로그 파일 저장 경로
const logDir = 'config/logs/user';

// 로그 디렉토리 생성 (존재하지 않을 경우)
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Custom Morgan Tokens
morgan.token('timestamp', () => moment().format('YYYY-MM-DD HH:mm:ss'));
morgan.token('status', (_, res) => res.statusCode.toString());
morgan.token('url', req => req.originalUrl);
morgan.token('method', req => req.method);
morgan.token(
    'response-time',
    (_, res) => res.getHeader('X-Response-Time') || '0ms',
);
morgan.token('ip', req => req.ip || 'Unknown IP');
morgan.token('req-body', req => JSON.stringify(req.body) || '{}');

// JSON 형식으로 로그 생성
const jsonMorganLogger = morgan((tokens, req, res) => {
    const logFileName = `${moment().format('YYYY-MM-DD')}.log`;
    const logFilePath = path.join(logDir, logFileName);

    const logData = {
        timestamp: tokens.timestamp(req, res),
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        responseTime: tokens['response-time'](req, res),
        user: tokens.user(req, res),
        ip: tokens.ip(req, res),
        requestBody: JSON.parse(tokens['req-body'](req, res)),
    };

    fs.appendFile(logFilePath, `${JSON.stringify(logData)}\n`, err => {
        if (err) {
            console.error(err);
        } else {
            console.log(logData);
        }
    });
    return null;
});

module.exports = jsonMorganLogger;
