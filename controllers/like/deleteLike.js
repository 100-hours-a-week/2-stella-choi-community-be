const { likeJson } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const deleteLike = async (req, res) => {
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
        const checkDeleted = await likeJson.deleteLike(userId, boardNumId);
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

module.exports = deleteLike;
