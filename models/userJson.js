const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '/data', '/user.json');

function readData() {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

async function addUser(newUser) {
    const data = await readData();
    const nextId = data.length > 0 ? data[data.length - 1].id + 1 : 1;

    const newDataWithId = { id: nextId, ...newUser };
    data.push(newDataWithId);
    writeData(data);
    console.log('데이터 추가 완료:', newDataWithId);
}

async function findUser(email) {
    const data = await readData();
    const user = data.find(item => item.email === email);
    return user || null;
}

async function findUserBySession(userID) {
    const data = await readData();
    const user = data.find(item => item.id === userID);
    return user || null;
}
module.exports = {
    addUser,
    readData,
    findUser,
    findUserBySession,
};
