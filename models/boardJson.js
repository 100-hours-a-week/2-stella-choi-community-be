const fs = require('fs');
const path = require('path');

const userPath = path.join(__dirname, '/data', '/user.json');
const boardPath = path.join(__dirname, '/data', '/board.json');
const commentPath = path.join(__dirname, '/data', '/comment.json');
const likePath = path.join(__dirname, '/data', '/like.json');

function readBoard() {
    const rawData = fs.readFileSync(boardPath, 'utf-8');
    return JSON.parse(rawData);
}

function readUserByUserId(userId) {
    const rawData = fs.readFileSync(userPath, 'utf-8');
    const users = JSON.parse(rawData);
    return users.find(user => user.id === userId);
}

function readCommentByBoardId(boardId) {
    const rawData = fs.readFileSync(commentPath, 'utf-8');
    const comments = JSON.parse(rawData);
    return comments
        .filter(comment => comment.board_id === boardId)
        .map(comment => {
            const user = readUserByUserId(comment.comment_writer_id);
            return {
                ...comment,
                comment_writer: user ? user.nickname : null,
                comment_writer_profile: user ? user.profile_image : null,
            };
        });
}

function readLikeByBoardId(boardId) {
    const rawData = fs.readFileSync(likePath, 'utf-8');
    const likes = JSON.parse(rawData);
    return likes.filter(like => like.board_id === boardId);
}

// function writeData(data) {
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
// }

async function getAllBoard(limit, offset) {
    const boards = await readBoard();
    const result = await Promise.all(
        boards.slice(offset, offset + limit).map(async board => {
            const comments = await readCommentByBoardId(board.post_id);
            const likes = await readLikeByBoardId(board.post_id);
            const user = await readUserByUserId(board.user_id);

            return {
                post_id: board.post_id,
                title: board.title,
                likes_count: likes.length,
                comment_count: comments.length,
                view_count: board.view_count,
                user_id: board.user_id,
                user_name: user ? user.nickname : null,
                user_profile: user ? user.profile_image : null,
                posted_time: board.posted_time,
            };
        }),
    );

    return result;
}

module.exports = {
    getAllBoard,
};
