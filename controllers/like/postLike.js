const { likeDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');

const postLike = async (req, res) => {
    let connection;
    const { userId } = req;
    const { board_id } = req.body;

    // ACTION: MISSING_FIELD
    if (!board_id) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISSING_FIELD,
                ),
            );
    }

    // ACTION: INVALID_FORMAT
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
        const existingLike = await likeDB.findLike(
            connection,
            userId,
            boardNumId,
        );

        if (existingLike.isLiked) {
            return res
                .status(statusCode.CONFLICT)
                .send(
                    util.fail(
                        statusCode.CONFLICT,
                        responseMessage.DUPLICATE_LIKE,
                    ),
                );
        }
        const likeData = {
            post_id: boardNumId,
            like_writer_id: userId,
        };
        const likeId = await likeDB.addLike(connection, likeData);
        return res
            .status(statusCode.CREATED)
            .send(
                util.success(
                    statusCode.CREATED,
                    responseMessage.CREATE_LIKE_SUCCESS,
                    likeId,
                ),
            );
    } catch (error) {
        console.log(error);
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

module.exports = postLike;
