const { commentDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');
const logger = require('../../utils/winstonLogger');

const deleteComment = async (req, res) => {
    let connection;
    const { userId } = req;
    const { commentId } = req.params;

    // ACTION: INVALID_FORMAT
    const commentNumId = Number(commentId);
    if (!util.checkIsInRange(commentNumId)) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.INVALID_FORMAT,
                ),
            );
    }

    try {
        connection = await pool.getConnection();

        const commentOwner = await commentDB.getCommentOwnerId(
            connection,
            commentNumId,
        );

        // ACTION: ACCESS_DENIED
        if (commentOwner !== userId) {
            return res
                .status(statusCode.FORBIDDEN)
                .send(
                    util.fail(
                        statusCode.FORBIDDEN,
                        responseMessage.ACCESS_DENIED,
                    ),
                );
        }

        const result = await commentDB.deleteComment(connection, commentNumId);
        if (result) {
            return res
                .status(statusCode.OK)
                .send(
                    util.success(
                        statusCode.OK,
                        responseMessage.DELETE_COMMENT_SUCCESS,
                    ),
                );
        }
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.DELETE_COMMENT_FAIL,
                ),
            );
    } catch (error) {
        logger.error(error);
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

module.exports = deleteComment;
