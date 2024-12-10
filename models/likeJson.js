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

async function findLike(userId, boardNumId) {
    const likes = await readData();
    const isLiked = await likes.some(
        data => data.board_id === boardNumId && data.like_writer_id === userId,
    );
    return isLiked;
}

async function deleteLike(userId, boardNumId) {
    const likes = await readData();

    // 삭제 대상 존재 여부 확인
    const exists = likes.some(
        item => item.like_writer_id === userId && item.board_id === boardNumId,
    );

    if (!exists) {
        console.log(
            `삭제할 데이터가 없습니다: userId=${userId}, boardNumId=${boardNumId}`,
        );
        return false; // 삭제할 데이터가 없으므로 함수 종료
    }

    // 삭제 대상 필터링
    const filteredData = likes.filter(
        item =>
            !(item.like_writer_id === userId && item.board_id === boardNumId),
    );

    // 데이터 저장
    await writeData(filteredData);
    return true;
}

module.exports = {
    addLike,
    getLike,
    findLike,
    deleteLike,
    readData,
};
