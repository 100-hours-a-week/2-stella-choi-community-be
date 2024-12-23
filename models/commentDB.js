const addComment = async (connection, newComment) => {
    try {
        const columns = Object.keys(newComment).join(', ');
        const values = Object.values(newComment);

        const placeholders = values.map(() => '?').join(', ');

        const query = `
          INSERT INTO Comment (${columns})
          VALUES (${placeholders})
        `;

        const rows = await connection.query(query, values);
        const serializedRows = JSON.stringify(rows, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value,
        );
        return JSON.parse(serializedRows).insertId;
    } catch (error) {
        console.log('Error adding comment: ', error);
        throw error;
    }
};

const editComment = async (connection, commentId, newComment) => {
    try {
        const query = `
          UPDATE Comment
          SET comment_data = ?
          WHERE comment_id = ?
      `;

        const rows = await connection.query(query, [
            newComment.content,
            commentId,
        ]);

        if (rows.affectedRows === 1) {
            return true;
        }
        return false;
    } catch (error) {
        console.log('Error updating comment: ', error);
    }
};

const getCommentOwnerId = async (connection, commentId) => {
    try {
        const query = `
            SELECT comment_writer_id
            FROM Comment
            WHERE comment_id = ?
        `;
        const rows = await connection.query(query, [commentId]);

        return rows[0].comment_writer_id;
    } catch (error) {
        console.log('Error getting board ownerId: ', error);
    }
};

const deleteComment = async (connection, commentId) => {
    try {
        const query = `
          DELETE FROM Comment
          WHERE comment_id = ?
        `;
        const rows = await connection.query(query, [commentId]);

        if (rows.affectedRows === 1) {
            return true;
        }
        return false;
    } catch (error) {
        console.log('Error deleting comment: ', error);
    }
};

module.exports = {
    addComment,
    editComment,
    getCommentOwnerId,
    deleteComment,
};
