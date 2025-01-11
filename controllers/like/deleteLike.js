const { likeDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');
const logger = require('../../utils/winstonLogger');

const deleteLike = async (req, res) => {
    let connection;
    const { userId } = req;
    const { boardId } = req.params;

    // ACTION: INVALID_FORMAT
    if (!boardId) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISSING_FIELD,
                ),
            );
    }

    const boardNumId = Number(boardId);
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
        const checkDeleted = await likeDB.deleteLike(
            connection,
            userId,
            boardNumId,
        );
        if (!checkDeleted) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    util.success(
                        statusCode.BAD_REQUEST,
                        responseMessage.NO_LIKE_DATA,
                    ),
                );
        }

        return res
            .status(statusCode.OK)
            .send(
                util.success(
                    statusCode.OK,
                    responseMessage.DELETE_LIKE_SUCCESS,
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

module.exports = deleteLike;
