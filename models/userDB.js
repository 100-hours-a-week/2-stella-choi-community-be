const addUser = async (connection, newUser) => {
    try {
        const columns = Object.keys(newUser).join(', ');
        const values = Object.values(newUser);

        const placeholders = values.map(() => '?').join(', ');

        const query = `
          INSERT INTO User (${columns})
          VALUES (${placeholders})
        `;

        const result = await connection.query(query, values);
        return result;
    } catch (error) {
        console.log('Error inserting user: ', error);
        throw error;
    }
};

const findUserByEmail = async (connection, email) => {
    try {
        const query = `
            SELECT COUNT(*) AS count
            FROM User
            WHERE email = ?
        `;
        const [result] = await connection.query(query, [email]);
        return result.count > 0;
    } catch (error) {
        console.log('Error finding user: ', error);
    }
};

const findUserByNickname = async (connection, nickname) => {
    try {
        const query = `
            SELECT COUNT(*) AS count
            FROM User
            WHERE nickname = ?
        `;
        const [result] = await connection.query(query, [nickname]);
        return result.count > 0;
    } catch (error) {
        console.log('Error finding user: ', error);
    }
};

const findUser = async (connection, email) => {
    try {
        const query = `
            SELECT *
            FROM User
            WHERE email = ?
        `;
        const [result] = await connection.query(query, [email]);
        return result || null;
    } catch (error) {
        console.log('Error finding user: ', error);
    }
};

const findUserBySession = async (connection, userID) => {
    try {
        const query = `
            SELECT *
            FROM User
            WHERE id = ?
        `;
        const [result] = await connection.query(query, [userID]);
        return result;
    } catch (error) {
        console.log('Error finding user: ', error);
    }
};

const updateUser = async (connection, updatedUser) => {
    try {
        const { id, ...fields } = updatedUser; // id와 나머지 필드 분리

        const columns = Object.keys(fields)
            .filter(key => fields[key] !== undefined)
            .map(key => `${key} = ?`)
            .join(', ');

        const values = Object.values(fields).filter(
            value => value !== undefined,
        );

        const query = `
            UPDATE User
            SET ${columns}
            WHERE id = ?
        `;

        const result = await connection.query(query, [...values, id]);
        return result;
    } catch (error) {
        console.log('Error updating user: ', error);
    }
};

const deleteUserBySession = async (connection, userID) => {
    try {
        const query = `
            DELETE FROM User
            WHERE id = ?
        `;

        const result = await connection.query(query, [userID]);
        if (result.affectedRows === 1) {
            return true;
        }
        return false;
    } catch (error) {
        console.log('Error deleting user: ', error);
    }
};

module.exports = {
    addUser,
    findUserByEmail,
    findUserByNickname,
    findUser,
    findUserBySession,
    updateUser,
    deleteUserBySession,
};
