const { userDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');
const logger = require('../../utils/winstonLogger');

const patchUser = async (req, res) => {
    let connection;
    const { userId } = req;
    const { nickname } = req.body;
    const profile_image = req.file;

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
        connection = await pool.getConnection();
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
            if (await userDB.findUserByNickname(connection, nickname)) {
                const user = await userDB.findUserBySession(connection, userId);
                const lastNickname = user.nickname;
                if (lastNickname !== nickname) {
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
        }

        const user = await userDB.findUserBySession(connection, userId);
        if (profile_image) {
            const profileImagePath = profile_image.path;
            user.profile_image = profileImagePath;
        }
        if (nickname) {
            user.nickname = nickname;
        }

        const newUser = {
            id: user.id,
            nickname: user.nickname,
            profile_image: user.profile_image,
        };

        await userDB.updateUser(connection, newUser);
        return res
            .status(statusCode.OK)
            .send(
                util.success(
                    statusCode.OK,
                    responseMessage.EDIT_PROFILE_SUCCESS,
                ),
            );
    } catch (err) {
        logger.error(err);
        return res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .send(
                util.fail(
                    statusCode.INTERNAL_SERVER_ERROR,
                    responseMessage.INTERNAL_SERVER_ERROR,
                ),
            );
    } finally {
        await connection.release();
    }
};

module.exports = patchUser;
