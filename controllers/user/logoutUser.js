const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const logoutUser = async (req, res) => {
    try {
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
                    util.success(statusCode.OK, responseMessage.LOGOUT_SUCCESS),
                );
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                responseMessage.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

module.exports = logoutUser;
