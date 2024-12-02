const { userJson } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const loginUser = async (req, res) => {
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
        const user = await userJson.findUser(email);
        if (user) {
            if (user.password !== password) {
                return res
                    .status(statusCode.UNAUTHORIZED)
                    .send(
                        util.fail(
                            statusCode.UNAUTHORIZED,
                            responseMessage.NOT_AUTHORIZED,
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
