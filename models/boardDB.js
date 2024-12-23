const getAllBoard = async (connection, limit, offset) => {
    try {
        const query = `
            SELECT
                b.post_id,
                b.title,
                b.view_count,
                MAX(b.posted_time) AS posted_time,
                u.id,
                u.nickname AS user_name,
                u.profile_image AS user_profile,
                COUNT(DISTINCT c.comment_id) AS comment_count,
                COUNT(DISTINCT l.like_id) AS likes_count
            FROM Post b
            LEFT JOIN Comment c ON b.post_id = c.post_id
            LEFT JOIN \`Like\` l ON b.post_id = l.post_id
            LEFT JOIN User u ON b.user_id = u.id
            GROUP BY b.post_id
            ORDER BY posted_time DESC
            LIMIT ? OFFSET ?;
        `;

        const rows = await connection.query(query, [limit, offset]);

        const serializedRows = JSON.stringify(rows, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value,
        );

        return JSON.parse(serializedRows);
    } catch (error) {
        console.log('Error getting post: ', error);
        throw error;
    }
};

const addBoard = async (connection, newBoard) => {
    try {
        const columns = Object.keys(newBoard).join(', ');
        const values = Object.values(newBoard);

        const placeholders = values.map(() => '?').join(', ');

        const query = `
        INSERT INTO Post (${columns})
        VALUES (${placeholders})
    `;

        const rows = await connection.query(query, values);
        const serializedRows = JSON.stringify(rows, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value,
        );
        return JSON.parse(serializedRows).insertId;
    } catch (error) {
        console.log('Error adding post: ', error);
        throw error;
    }
};

const getBoardById = async (connection, boardId) => {
    try {
        const query = `
        SELECT b.post_id,
               b.title,
               b.view_count,
               b.content,
               b.post_image,
               MAX(b.posted_time)           AS posted_time,
               u.id AS user_id,
               u.nickname                   AS user_name,
               u.profile_image              AS user_profile,
               COUNT(DISTINCT c.comment_id) AS comment_count,
               COUNT(DISTINCT l.like_id)    AS likes_count
        FROM Post b
                 LEFT JOIN Comment c ON b.post_id = c.post_id
                 LEFT JOIN \`Like\` l ON b.post_id = l.post_id
                 LEFT JOIN User u ON b.user_id = u.id
        WHERE b.post_id = ?
        GROUP BY b.post_id
    `;
        const [rows] = await connection.query(query, [boardId]);
        const serializedRows = JSON.stringify(rows, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value,
        );

        const commentQuery = `
        SELECT
            c.comment_id,
            c.comment_data,
            c.comment_writer_id,
            c.comment_posted_time,
            u.nickname AS comment_writer,
            u.profile_image AS comment_writer_profile
        FROM Comment c 
            LEFT JOIN User u ON c.comment_writer_id = u.id
        WHERE c.post_id = ?
    `;
        const comments = await connection.query(commentQuery, [boardId]);

        return {
            ...JSON.parse(serializedRows),
            comments,
        };
    } catch (error) {
        console.log('Error getting post: ', error);
        throw error;
    }
};

const incrementViewCount = async (connection, boardId) => {
    try {
        const query = `
        UPDATE Post
        SET view_count = view_count + 1
        WHERE post_id = ?
    `;

        const rows = await connection.query(query, [boardId]);
        if (rows.affectedRows === 1) {
            return true;
        }
        return false;
    } catch (error) {
        console.log('Error incrementing view count: ', error);
        throw error;
    }
};

const getBoardOwnerId = async (connection, boardId) => {
    try {
        const query = `
        SELECT user_id
        FROM Post
        WHERE post_id = ?
    `;
        const rows = await connection.query(query, [boardId]);

        return rows[0].user_id;
    } catch (error) {
        console.log('Error getting board ownerId: ', error);
    }
};

const editBoard = async (connection, boardId, newBoard) => {
    try {
        const columns = Object.keys(newBoard)
            .filter(key => newBoard[key] !== undefined)
            .map(key => `${key} = ?`)
            .join(', ');

        const values = Object.values(newBoard).filter(
            value => value !== undefined,
        );

        const query = `
            UPDATE Post
            SET ${columns}
            WHERE post_id = ?
        `;

        const result = await connection.query(query, [...values, boardId]);
        return result;
    } catch (error) {
        console.log('Error editing board: ', error);
        throw error;
    }
};

const deleteBoard = async (connection, boardId) => {
    try {
        const query = `
        DELETE FROM Post
        WHERE post_id = ?
    `;

        const rows = await connection.query(query, [boardId]);
        if (rows.affectedRows === 1) {
            return true;
        }
        return false;
    } catch (error) {
        console.log('Error deleting board: ', error);
        throw error;
    }
};

module.exports = {
    getAllBoard,
    addBoard,
    getBoardById,
    incrementViewCount,
    getBoardOwnerId,
    editBoard,
    deleteBoard,
};
