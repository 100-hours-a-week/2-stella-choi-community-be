// 인증 미들웨어
const authenticate = (req, res, next) => {
    if (!req.session.user) {
        return res.status(400).json({ error: '인증되지 않았습니다.' });
    }
    next();
};

// 인가 미들웨어
const authorize = (req, res, next) => {
    if (!req.session.role || req.session.role !== 'admin') {
        return res.status(400).json({ error: '인가되지 않았습니다.' });
    }
    next();
};

module.exports = {
    authenticate,
    authorize,
};
