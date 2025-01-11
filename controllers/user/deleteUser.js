const { userDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');
const logger = require('../../utils/winstonLogger');

const deleteUser = async (req, res) => {
    let connection;
    const { userId } = req;
    try {
        connection = await pool.getConnection();
        const result = await userDB.deleteUserBySession(connection, userId);

        if (result) {
            req.session.destroy(error => {
                if (error) {
                    console.error('Failed to destroy session:', error);
                    return res
                        .status(statusCode.INTERNAL_SERVER_ERROR)
                        .send(
                            util.fail(
                                statusCode.INTERNAL_SERVER_ERROR,
                                responseMessage.INTERNAL_SERVER_ERROR,
                            ),
                        );
                }

                res.clearCookie('connect.sid');
                return res
                    .status(statusCode.OK)
                    .send(
                        util.success(
                            statusCode.OK,
                            responseMessage.DELETE_INFO_SUCCESS,
                        ),
                    );
            });
        }
    } catch (error) {
        logger.error(error);
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

module.exports = deleteUser;
