const { userJson } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const getUser = async (req, res) => {
    const { userId } = req;

    try {
        if (userId) {
            const user = await userJson.findUserBySession(userId);
            const response = {
                email: user.email,
                nickname: user.nickname,
                profile_image: user.profile_image,
            };
            res.status(statusCode.OK).send(
                util.success(
                    statusCode.OK,
                    responseMessage.GET_INFO_SUCCESS,
                    response,
                ),
            );
        }
    } catch (err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                responseMessage.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

module.exports = getUser;
