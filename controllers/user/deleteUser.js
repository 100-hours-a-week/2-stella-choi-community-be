const { userDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');

const deleteUser = async (req, res) => {
    const connection = await pool.getConnection();
    const { userId } = req;
    try {
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
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                responseMessage.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

module.exports = deleteUser;
