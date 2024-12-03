const { boardJson } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const deleteBoard = async (req, res) => {
    const { userId } = req;
    const { boardId } = req.params;

    // ACTION: INVALID_FORMAT
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

    // ACTION: ACCESS_DENIED
    const boardOwner = await boardJson.getBoardOwnerId(boardNumId);
    if (boardOwner !== userId) {
        return res
            .status(statusCode.FORBIDDEN)
            .send(
                util.fail(statusCode.FORBIDDEN, responseMessage.ACCESS_DENIED),
            );
    }
    try {
        await boardJson.deleteBoard(boardNumId);
        return res
            .status(statusCode.OK)
            .send(
                util.success(
                    statusCode.OK,
                    responseMessage.DELETE_POST_SUCCESS,
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
    }
};

module.exports = deleteBoard;
