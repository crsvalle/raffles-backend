const db = require("../db/dbConfig");
const bcrypt = require('bcrypt');

const getAllRaffles = async () => {
    return db.manyOrNone("SELECT * FROM raffles")
}

const getRaffleById = async (id) => {
    return db.oneOrNone("SELECT * FROM raffles WHERE id = $1", [id]);
};

const createRaffle = async (raffle) => {
    const { name, secret_token } = raffle;
    const hashedSecret = await bcrypt.hash(secret_token, 10);
    return db.oneOrNone(`
        INSERT INTO raffles (name, secret_token, created_at)
        VALUES ($1, $2, CURRENT_TIMESTAMP)
        RETURNING *;
        `,
        [name, hashedSecret]
    );
}

const updateRaffle = async (id) => {
    return db.oneOrNone(
        `
        UPDATE raffles
        SET ended = true, winner_id = (
            SELECT id
            FROM participants
            WHERE raffle_id = $1
            ORDER BY RANDOM()
            LIMIT 1
        )
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );
};

const deleteRaffle = async (id) => {
    return db.oneOrNone("DELETE FROM raffles WHERE id = $1 RETURNING *;", [id]);
};

module.exports = {
    getAllRaffles,
    getRaffleById,
    createRaffle,
    updateRaffle,
    deleteRaffle
}