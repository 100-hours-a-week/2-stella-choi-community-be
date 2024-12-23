const addLike = async (connection, newLike) => {
    try {
        const columns = Object.keys(newLike).join(', ');
        const values = Object.values(newLike);

        const placeholders = values.map(() => '?').join(', ');

        const query = `
          INSERT INTO \`Like\` (${columns})
          VALUES (${placeholders})
        `;

        const rows = await connection.query(query, values);
        const serializedRows = JSON.stringify(rows, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value,
        );
        return {
            like_id: JSON.parse(serializedRows).insertId,
        };
    } catch (error) {
        console.log('Error adding like: ', error);
        throw error;
    }
};

const findLike = async (connection, userId, boardId) => {
    try {
        const query = `
            SELECT EXISTS (
                    SELECT 1
                    FROM \`Like\`
                    WHERE post_id = ? AND like_writer_id = ?
                ) AS isLiked;
          `;
        const [rows] = await connection.query(query, [boardId, userId]);
        return {
            isLiked: Boolean(rows.isLiked),
        };
    } catch (error) {
        console.log('Error finding like: ', error);
    }
};

const deleteLike = async (connection, userId, boardId) => {
    try {
        const query = `
            DELETE FROM \`Like\`
            WHERE post_id = ? AND like_writer_id = ?
        `;
        const rows = await connection.query(query, [boardId, userId]);

        if (rows.affectedRows === 1) {
            return true;
        }
        return false;
    } catch (error) {
        console.log('Error deleting like: ', error);
    }
};

module.exports = {
    addLike,
    findLike,
    deleteLike,
};
