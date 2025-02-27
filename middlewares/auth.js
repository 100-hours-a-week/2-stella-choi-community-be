const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const util = require('../libs/util');
const { userDB } = require('../models');
const pool = require('../models/db');

// 인가 미들웨어
const authMiddleware = async (req, res, next) => {
    let connection;
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

    try {
        connection = await pool.getConnection();
        const user = await userDB.findUserBySession(
            connection,
            req.session.userId,
        );
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
    } catch (error) {
        console.error(error);
    } finally {
        await connection.release();
    }
};

module.exports = {
    authMiddleware,
};
