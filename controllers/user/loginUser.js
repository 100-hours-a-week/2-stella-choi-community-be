const bcrypt = require('bcrypt');
const { userDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');

const loginUser = async (req, res) => {
    const connection = await pool.getConnection();
    const { email, password } = req.body;

    // ACTION: MISSING_FIELD
    if (!email || !password) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISSING_FIELD,
                ),
            );
    }

    // ACTION: INVALID_FORMAT
    if (!util.validateEmail(email)) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.INVALID_EMAIL_FORMAT,
                ),
            );
    }

    // ACTION: NOT_AUTHORIZED , NOT_FOUND_USER
    try {
        const user = await userDB.findUser(connection, email);
        if (user) {
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password,
            );
            if (!isPasswordMatch) {
                return res
                    .status(statusCode.UNAUTHORIZED)
                    .send(
                        util.fail(
                            statusCode.UNAUTHORIZED,
                            responseMessage.INVALID_PASSWORD,
                        ),
                    );
            }
        } else {
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_USER));
        }

        req.session.userId = user.id;
        return res
            .status(statusCode.OK)
            .send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS));
    } catch (error) {
        return res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .send(
                util.fail(
                    statusCode.INTERNAL_SERVER_ERROR,
                    responseMessage.INTERNAL_SERVER_ERROR,
                ),
            );
    }
};

module.exports = loginUser;
