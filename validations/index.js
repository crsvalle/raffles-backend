const { getRaffleById } = require("../queries/rafflesQueries")
const { getParticipantsOfRaffle } = require('../queries/participantsQueries')
const bcrypt = require('bcrypt');

const participant_fields = [
    'first_name', 'last_name', 'email', 'phone'
];

const raffle_fields = [
    'name', 'secret_token'
]

const validateRaffleNotOver = async (req, res, next) => {
    const { id } = req.params;
    const { secret_token, ...rest } = req.body;

    if (Object.keys(rest).length > 0) {
        return res.status(400).json({ error: `The request body must only contain secret_token.` })
    }

    const raffle = await getRaffleById(id);
    if (raffle.ended) {
        return res.status(400).json({ error: "The raffle has already ended." });
    }

    const size = await getParticipantsOfRaffle(id)
    if (size < 1) {
        return res.status(400).json({ error: "There is no participants in this raffle for it to end." })
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
    if (!raffle) {
        return res.status(404).json({ error: `Cannot find raffle with ID: ${id}` })
    }

    next();
}
const validateFields = (req, res, next, fields) => {
    const body = req.body;

    for (const field of fields) {
        if (!body.hasOwnProperty(field)) {
            return res.status(400).json({
                error: `${field} is missing or wrong, received ${body[field]}`
            });
        }
    }

    for (const field in body) {
        if (!fields.includes(field)) {
            return res.status(400).json({ error: `${field} is not allowed.` });
        }
    }

    for (const field in body) {
        if (typeof body[field] !== 'string' && field !== 'phone') {
            return res.status(400).json({ error: `'${field}' field must be a string.` });
        }
        
        if (body[field].trim() === '' && field !== 'phone') {
            return res.status(400).json({ error: `'${field}' field cannot be empty.` });
        }
    }

    if (!body['phone'] && fields === participant_fields) {
        body['phone'] = null;
    }

    if (body['phone'] && body['phone'].trim().length !== 10) {
        return res.status(400).json({ error: `'Phone' field must be exactly 10 characters.` });
    }
    next();
};
const validateSecret = async (req, res, next) => {
    const { id } = req.params;
    const { secret_token } = req.body;

    const raffle = await getRaffleById(id);
    if (!raffle) {
        return res.status(404).json({ error: `Raffle with ID ${id} not found` });
    }

    const match = await bcrypt.compare(secret_token, raffle.secret_token);
    if (!match) {
        return res.status(403).json({ error: 'Wrong Secret!' });
    }

    req.raffle = raffle;
    next();

};

const validateRaffle = (req, res, next) => {
    validateFields(req, res, next, raffle_fields);
};

const validateParticipant = (req, res, next) => {
    validateFields(req, res, next, participant_fields);
};

module.exports = { validateId, validateRaffle, validateRaffleExist, validateRaffleNotOver, validateParticipant, validateSecret }