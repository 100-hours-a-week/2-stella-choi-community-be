const { boardDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');
const logger = require('../../utils/winstonLogger');

const getAllBoard = async (req, res) => {
    let connection;
    const { offset, limit } = req.query;
    if (!offset || !limit) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISSING_PARAMETER,
                ),
            );
    }

    if (!util.checkIsInRange(limit)) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.INVALID_FORMAT,
                ),
            );
    }

    if (!util.checkIsInRange(offset)) {
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
        const numOffset = Number(offset);
        const numLimit = Number(limit);
        const boards = await boardDB.getAllBoard(
            connection,
            numLimit,
            numOffset,
        );

        res.status(statusCode.OK).send(
            util.success(
                statusCode.OK,
                responseMessage.GET_ALL_BOARD_SUCCESS,
                boards,
            ),
        );
    } catch (err) {
        logger.error(err);
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

module.exports = getAllBoard;
