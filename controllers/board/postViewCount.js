const { boardDB } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');
const pool = require('../../models/db');

const postViewCount = async (req, res) => {
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

    try {
        const result = await boardDB.incrementViewCount(
            connection,
            Number(boardId),
        ); // 조회수 증가 로직
        if (result) {
            res.status(statusCode.OK).send(
                util.success(
                    statusCode.OK,
                    responseMessage.INCREMENT_VIEW_COUNT_SUCCESS,
                ),
            );
        } else {
            res.status(statusCode.BAD_REQUEST).send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.INCREMENT_VIEW_COUNT_FAIL,
                ),
            );
        }
    } catch (err) {
        console.error(err);
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

module.exports = postViewCount;
