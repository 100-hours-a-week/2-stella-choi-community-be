const express = require('express');
const path = require('path');

const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const responseTime = require('response-time');
const dotenv = require('dotenv');
const logger = require('./utils/winstonLogger');

const PORT = 8080;

// 운영 환경 변수 정의

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.local' });
}

// Cors 옵션 정의
const allowedOrigins = ['http://localhost:3000', 'http://3.34.50.126:3000']; // 허용할 호스트
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS')); // 허용되지 않은 origin
            }
        },
        credentials: true, // 세션을 주고받기 위해 쿠키 허용
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SECRET_KEY, // 세션 암호화 키
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // HTTPS 사용 시 true로 설정
    }),
);

app.use(responseTime());
morgan.token(
    'response-time',
    (_, res) => res.getHeader('X-Response-Time') || '0ms',
);

app.use(
    morgan('combined', {
        stream: {
            write: message => logger.info(message.trim()),
        },
    }),
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));

app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
