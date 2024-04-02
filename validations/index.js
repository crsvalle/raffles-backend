const { getRaffleById } = require("../queries/rafflesQueries")

const participant_fields = [
    'first_name', 'last_name', 'email', 'phone'
];

const raffle_fields = [
    'name', 'secret_token'
]
const validateRaffleNotOver = async (req, res, next) => {
    const { id } = req.params;
    if (Object.keys(req.body).length > 0){
        return res.status(400).json({error: `The request body must be empty.`})
    }
    const raffle = await getRaffleById(id); 
    if (raffle.ended) {
        return res.status(400).json({ error: "The raffle has already ended." });
    }
    next();
}

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
        return res.status(400).json({ error: `${id} is not a valid id` })
    }

    res.id = Number(id);
    next();
}

const validateRaffleExist = async (req, res, next) => {
    const { id } = res;
    const raffle = await getRaffleById(id);
    if (!raffle){
        return res.status(404).json({error: `Cannot find ID: ${id}`})
    }

    next();
}

const validateRaffle = (req, res, next) => {
    const raffleBody = req.body;

    for (const field of raffle_fields) {
        if (!raffleBody.hasOwnProperty(field)) {
            return res.status(400).json({
                error: `${field} is missing or wrong, recevied ${raffleBody[field]}`
            })
        }
    }
    for (const field in raffleBody) {
        if (!raffle_fields.includes(field)) {
            return res.status(400).json({ error: `${field} is not allowed.` })
        }
    }

    for (const field in raffleBody) {
        if (typeof raffleBody[field] !== 'string') {
            return res.status(400).json({ error: `'${raffleBody[field]}' field must be a string.` })
        }

    }

    next();
}

const validateParticipant = (req, res, next) => {
    const participantBody = req.body;

    for (const field of participant_fields) {
        if (!participantBody.hasOwnProperty(field)) {
            return res.status(400).json({
                error: `${field} is missing or wrong, received ${participantBody[field]}`
            });
        }
    }

    for (const field in participantBody) {
        if (!participant_fields.includes(field)) {
            return res.status(400).json({ error: `${field} is not allowed.` });
        }
    }

    for (const field in participantBody) {
        if (typeof participantBody[field] !== 'string' && field !== 'phone') {
            return res.status(400).json({ error: `'${field}' field must be a string.` });
        }
    }
    if (!participantBody['phone']){
        participantBody['phone'] = null;
    }

    next();
}
module.exports = { validateId, validateRaffle, validateRaffleExist, validateRaffleNotOver, validateParticipant}