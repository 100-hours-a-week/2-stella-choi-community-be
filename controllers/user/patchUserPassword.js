const bcrypt = require('bcrypt');
const { userJson } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const patchUserPassword = async (req, res) => {
    const { userId } = req;
    const { password, password_check } = req.body;
    if (!password || !password_check) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISSING_FIELD,
                ),
            );
    }

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

    if (!util.validatePassword(password)) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.INVALID_PASSWORD,
                ),
            );
    }

    const user = await userJson.findUserBySession(userId);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.SAME_BEFORE_PASSWORD,
                ),
            );
    }

    try {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(user.password);
        console.log(hashedPassword);
        user.password = hashedPassword;

        await userJson.updateUser(user);
        return res
            .status(statusCode.OK)
            .send(
                util.success(
                    statusCode.OK,
                    responseMessage.EDIT_PASSWORD_SUCCESS,
                ),
            );
    } catch (err) {
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

module.exports = patchUserPassword;
