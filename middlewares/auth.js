const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const util = require('../libs/util');

// 인가 미들웨어
const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        return res
            .status(statusCode.UNAUTHORIZED)
            .send(
                util.fail(
                    statusCode.UNAUTHORIZED,
                    responseMessage.NOT_AUTHORIZED,
                ),
            );
    }
    next();
};

module.exports = {
    authMiddleware,
};
