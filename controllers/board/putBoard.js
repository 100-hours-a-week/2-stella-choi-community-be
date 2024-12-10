const { boardJson } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const putBoard = async (req, res) => {
    const { userId } = req;
    const { title, content } = req.body;
    const post_image = req.file;
    const { boardId } = req.params;

    // ACTION: MISSING_FIELD
    if (!title || !content || !post_image) {
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

    // ACTION: INVALID_TITLE
    if (!util.validateTitle(title)) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.INVALID_TITLE,
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

    const postImagePath = post_image.path;
    try {
        const putData = {
            title,
            content,
            post_image: postImagePath,
        };
        await boardJson.editBoard(boardNumId, putData);
        return res
            .status(statusCode.OK)
            .send(
                util.success(statusCode.OK, responseMessage.EDIT_POST_SUCCESS),
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

module.exports = putBoard;
