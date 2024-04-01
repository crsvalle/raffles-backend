const db = require("../db/dbConfig");

const getAllParticipants = async () => {
    return db.manyOrNone("SELECT * FROM participants")
}
const getParticipantsOfRaffle = async (id) => {
    return db.any(`
    SELECT * 
    FROM participants 
    WHERE raffle_id = $1`, [id])
}

const createParticipant = async (participant) => {
    const { raffle_id, first_name, last_name, email, phone } = participant;

    return db.oneOrNone(`
        INSERT INTO participants (raffle_id, first_name, last_name, email, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
    `, [raffle_id, first_name, last_name, email, phone])
}

module.exports = {
    getAllParticipants,
    getParticipantsOfRaffle,
    createParticipant
}