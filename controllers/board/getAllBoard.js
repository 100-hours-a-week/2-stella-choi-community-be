const { boardJson } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const getAllBoard = async (req, res) => {
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
        const numOffset = Number(offset);
        const numLimit = Number(limit);
        const boards = await boardJson.getAllBoard(numLimit, numOffset);
        res.status(statusCode.OK).send(
            util.success(
                statusCode.OK,
                responseMessage.GET_ALL_BOARD_SUCCESS,
                boards,
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

module.exports = getAllBoard;
