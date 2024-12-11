const express = require('express');
const path = require('path');

const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = 8080;
require('dotenv').config();

const allowedOrigins = ['http://localhost:3000']; // 허용할 호스트
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

app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));

app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
