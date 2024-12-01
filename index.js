const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const PORT = 3000;
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_KEY, // 세션 암호화 키
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // HTTPS 사용 시 true로 설정
}));

app.use('/', require('./routes'));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});