const fs = require('fs');
const path = require('path');

const dateFormat = require('../libs/dateFormat');

const filePath = path.join(__dirname, '/data', '/comment.json');

function readComment() {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

async function addComment(data) {
    const comment = await readComment();
    const nextId =
        comment.length > 0 ? comment[comment.length - 1].comment_id + 1 : 1;
    const newComment = {
        board_id: data.board_id,
        comment_id: nextId,
        comment_writer_id: data.user_id,
        comment_posted_time: dateFormat(new Date(Date.now())),
        comment_content: data.content,
    };
    await comment.push(newComment);
    writeData(comment);
    console.log('데이터 추가 완료:', newComment);
    return {
        comment_id: newComment.comment_id,
    };
}

async function editComment(commentId, data) {
    const comments = await readComment();
    const comment = await comments.find(
        index => index.comment_id === commentId,
    );
    comment.comment_data = data.content;
    writeData(comments);
}

async function getCommentOwnerId(commentId) {
    const comments = await readComment();
    const comment = await comments.find(data => data.comment_id === commentId);
    return comment.comment_writer_id;
}

module.exports = {
    addComment,
    editComment,
    getCommentOwnerId,
};
