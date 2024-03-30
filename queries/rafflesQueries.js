const db = require("../db");

const getRaffleById = async (id) => {
    return db.oneOrNone("SELECT * FROM students WHERE id = $1", [id]);
};

const deleteRaffle = async (id) => {
    return db.oneOrNone("DELETE FROM students WHERE id = $1 RETURNING *;", [id]);
};


module.exports = {
    getRaffleById,
    deleteRaffle
}