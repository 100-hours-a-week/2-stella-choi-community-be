const { boardDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');

const getBoard = async (req, res) => {
    const connection = await pool.getConnection();
    const { boardId } = req.params;
    if (!boardId) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISSING_VARIABLE,
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
        const board = await boardDB.getBoardById(connection, boardNumId);
        res.status(statusCode.OK).send(
            util.success(
                statusCode.OK,
                responseMessage.GET_POST_DETAIL_SUCCESS,
                board,
            ),
        );
    } catch (err) {
        console.error(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                responseMessage.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

module.exports = getBoard;
