const { boardJson } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const postViewCount = async (req, res) => {
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
        await boardJson.incrementViewCount(Number(boardId)); // 조회수 증가 로직
        res.status(statusCode.OK).send(
            util.success(
                statusCode.OK,
                responseMessage.INCREMENT_VIEW_COUNT_SUCCESS,
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

module.exports = postViewCount;
