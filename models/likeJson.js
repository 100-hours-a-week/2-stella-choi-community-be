const fs = require('fs');
const path = require('path');
const dateFormat = require('../libs/dateFormat');

const filePath = path.join(__dirname, '/data', '/like.json');

function readData() {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

async function addLike(newLike) {
    const data = await readData();
    const nextId = data.length > 0 ? data[data.length - 1].like_id + 1 : 1;

    const newDataWithId = {
        board_id: newLike.board_id,
        like_id: nextId,
        like_writer_id: newLike.user_id,
        like_posted_time: dateFormat(new Date(Date.now())),
    };
    data.push(newDataWithId);
    writeData(data);
    console.log('데이터 추가 완료:', newDataWithId);
    return {
        like_id: newDataWithId.like_id,
    };
}

async function getLike(userId, boardNumId) {
    const likes = await readData();
    const isLiked = await likes.some(
        data => data.board_id === boardNumId && data.like_writer_id === userId,
    );
    return {
        isLiked,
    };
}

module.exports = {
    addLike,
    getLike,
    readData,
};
