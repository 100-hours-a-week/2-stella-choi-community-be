const { boardDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');

const postBoard = async (req, res) => {
    const connection = await pool.getConnection();
    const { userId } = req;
    const { title, content } = req.body;
    const post_image = req.file;

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

    const postImagePath = post_image.path;

    try {
        const postData = {
            title,
            content,
            user_id: userId,
            post_image: postImagePath,
        };
        const boardId = await boardDB.addBoard(connection, postData);
        return res
            .status(statusCode.CREATED)
            .send(
                util.success(
                    statusCode.CREATED,
                    responseMessage.CREATE_POST_SUCCESS,
                    boardId,
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

module.exports = postBoard;
