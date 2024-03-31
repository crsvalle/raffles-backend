const db = require("../db/dbConfig");

const getAllRaffles = async () => {
    return db.manyOrNone("SELECT * FROM raffles")
}

const getRaffleById = async (id) => {
    return db.oneOrNone("SELECT * FROM raffles WHERE id = $1", [id]);
};

const deleteRaffle = async (id) => {
    return db.oneOrNone("DELETE FROM raffles WHERE id = $1 RETURNING *;", [id]);
};


module.exports = {
    getAllRaffles,
    getRaffleById,
    deleteRaffle
}