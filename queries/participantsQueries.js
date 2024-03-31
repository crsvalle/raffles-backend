const db = require("../db/dbConfig");

const getAllParticipants = async () => {
    return db.manyOrNone("SELECT * FROM participants")
}
const getParticipantsOfRaffle = async(id) => {
    return db.any(`
    SELECT * 
    FROM participants 
    WHERE raffle_id = $1`, [id])
}


module.exports = {
    getAllParticipants,
    getParticipantsOfRaffle
}