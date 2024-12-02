const { userJson } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const postUser = async (req, res) => {
    const { email, password, password_check, nickname, profile_image } =
        req.body;

    // ACTION: MISSING_FIELD
    if (!email || !password || !password_check || !nickname || !profile_image) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISSING_FIELD,
                ),
            );
    }

    // ACTION: NOT_SAME_PASSWORD
    if (password !== password_check) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.NOT_SAME_PASSWORD,
                ),
            );
    }

    // ACTION: INVALID_FORMAT
    if (!util.validatePassword(password) || !util.validateNickname(nickname)) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.INVALID_FORMAT,
                ),
            );
    }

    // ACTION: DUPLICATE_NICKNAME
    if (util.duplicateNickname(userJson.readData(), nickname)) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.DUPLICATE_NICKNAME,
                ),
            );
    }

    // ACTION: DUPLICATE_EMAIL
    if (util.duplicateEmail(userJson.readData(), email)) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.DUPLICATE_EMAIL,
                ),
            );
    }

    try {
        await userJson.addUser(req.body);
        return res
            .status(statusCode.CREATED)
            .send(
                util.success(
                    statusCode.CREATED,
                    responseMessage.REGISTER_SUCCESS,
                ),
            );
    } catch (error) {
        console.log(error);
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

module.exports = postUser;
