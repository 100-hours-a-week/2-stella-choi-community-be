const { userJson } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const patchUser = async (req, res) => {
    const { userId } = req;
    const { profile_image, nickname } = req.body;
    if (!profile_image && !nickname) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISSING_FIELD,
                ),
            );
    }
    try {
        if (nickname) {
            if (!util.validateNickname(nickname)) {
                return res
                    .status(statusCode.BAD_REQUEST)
                    .send(
                        util.fail(
                            statusCode.BAD_REQUEST,
                            responseMessage.INVALID_NICKNAME,
                        ),
                    );
            }

            // [ACTION] DUPLICATE NICKNAME
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
        }

        const user = await userJson.findUserBySession(userId);
        if (profile_image) {
            user.profile_image = profile_image;
        }
        if (nickname) {
            user.nickname = nickname;
        }

        console.log(user);

        await userJson.updateUser(user);
        return res
            .status(statusCode.OK)
            .send(
                util.success(
                    statusCode.OK,
                    responseMessage.EDIT_PROFILE_SUCCESS,
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

module.exports = patchUser;
