const db = require("../db/dbConfig");

const getAllParticipants = async () => {
    return db.manyOrNone("SELECT * FROM participants")
}
const getParticipantsOfRaffle = async (id) => {
    return db.any(`
        SELECT * 
        FROM participants 
        WHERE raffle_id = $1`
    , [id])
}

const createParticipant = async (participant) => {
    const { raffle_id, first_name, last_name, email, phone } = participant;

    return db.oneOrNone(`
        INSERT INTO participants (raffle_id, first_name, last_name, email, phone, created_at)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
        RETURNING id;
    `, [raffle_id, first_name, last_name, email, phone])
}

const getWinnerFromRaffle = async (id) => {
    return db.oneOrNone(`
        SELECT participants.*
        FROM participants
        JOIN raffles ON participants.id = raffles.winner_id
        WHERE raffles.id = $1;
    `, [id])
}

module.exports = {
    getAllParticipants,
    getParticipantsOfRaffle,
    createParticipant,
    getWinnerFromRaffle
}