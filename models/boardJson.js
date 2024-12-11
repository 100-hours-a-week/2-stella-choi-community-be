const fs = require('fs');
const path = require('path');
const dateFormat = require('../libs/dateFormat');

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
                comment_id: comment.comment_id,
                comment_writer_id: comment.comment_writer_id,
                comment_posted_time: comment.comment_posted_time,
                comment_data: comment.comment_content,
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

function writeBoard(data) {
    fs.writeFileSync(boardPath, JSON.stringify(data, null, 2), 'utf-8');
}

async function getAllBoard(limit, offset) {
    const boards = await readBoard();
    const slicedBoards = boards.slice(offset, offset + limit); // 먼저 자르고

    const result = await Promise.all(
        slicedBoards.map(async board => {
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

async function addBoard(data) {
    const board = await readBoard();
    const nextId = board.length > 0 ? board[board.length - 1].post_id + 1 : 1;
    const newBoard = {
        post_id: nextId,
        title: data.title,
        view_count: 0,
        user_id: data.user_id,
        content: data.content,
        posted_time: dateFormat(new Date(Date.now())),
        post_image: data.post_image,
    };
    await board.push(newBoard);
    writeBoard(board);
    console.log('데이터 추가 완료:', newBoard);
    return {
        post_id: newBoard.post_id,
    };
}

async function getBoardById(boardId) {
    const boards = await readBoard();
    const board = await boards.find(data => data.post_id === boardId);
    const user = await readUserByUserId(board.user_id);
    const comments = await readCommentByBoardId(boardId);
    const likes = await readLikeByBoardId(boardId);
    board.view_count += 1;
    writeBoard(boards);
    const boardInfo = {
        ...board,
        comment_count: comments.length,
        likes_count: likes.length,
        user_name: user ? user.nickname : null,
        user_profile: user ? user.profile_image : null,
        comments,
    };

    return boardInfo;
}

async function getBoardOwnerId(boardId) {
    const boards = await readBoard();
    const board = await boards.find(data => data.post_id === boardId);
    return board.user_id;
}

async function editBoard(boardId, data) {
    const boards = await readBoard();
    const board = await boards.find(index => index.post_id === boardId);
    board.title = data.title;
    board.content = data.content;
    board.post_image = data.post_image;
    writeBoard(boards);
}

async function deleteBoard(boardId) {
    const boards = await readBoard();
    const filteredBoard = await boards.filter(
        index => index.post_id !== boardId,
    );

    await writeBoard(filteredBoard);
}

module.exports = {
    getAllBoard,
    addBoard,
    getBoardById,
    getBoardOwnerId,
    editBoard,
    deleteBoard,
};
