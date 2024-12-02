const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const util = require('../libs/util');
const { userJson } = require('../models');

// 인가 미들웨어
const authMiddleware = (req, res, next) => {
    if (!req.session) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISSING_SESSION,
                ),
            );
    }
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

    const user = userJson
        .readData()
        .find(info => info.id === req.session.userId);

    if (!user) {
        return res
            .status(statusCode.UNAUTHORIZED)
            .send(
                util.fail(
                    statusCode.UNAUTHORIZED,
                    responseMessage.NOT_FOUND_USER,
                ),
            );
    }

    req.userId = user.id;
    next();
};

module.exports = {
    authMiddleware,
};
