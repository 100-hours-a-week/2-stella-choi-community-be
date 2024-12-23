const { userDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');

const getUser = async (req, res) => {
    const connection = await pool.getConnection();
    const { userId } = req;

    try {
        if (userId) {
            const user = await userDB.findUserBySession(connection, userId);
            const response = {
                email: user.email,
                nickname: user.nickname,
                profile_image: user.profile_image,
                user_id: userId,
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
    } finally {
        await connection.release();
    }
};

module.exports = getUser;
