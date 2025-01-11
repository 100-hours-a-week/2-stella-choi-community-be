const { commentDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');
const logger = require('../../utils/winstonLogger');

const postComment = async (req, res) => {
    let connection;
    const { userId } = req;
    const { board_id, content } = req.body;

    // ACTION: MISSING_FIELD
    if (!board_id || !content) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISSING_FIELD,
                ),
            );
    }

    const boardNumId = Number(board_id);
    if (!util.checkIsInRange(boardNumId)) {
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
        const commentData = {
            comment_data: content,
            post_id: boardNumId,
            comment_writer_id: userId,
        };
        const commentId = await commentDB.addComment(connection, commentData);

        return res
            .status(statusCode.CREATED)
            .send(
                util.success(
                    statusCode.CREATED,
                    responseMessage.CREATE_COMMENT_SUCCESS,
                    commentId,
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

module.exports = postComment;
