const raffle_fields = [
    'name', 'secret_token'
]

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
        return res.status(400).json({ error: `${id} is not a valid id` })
    }

    next();
}

const validateRaffle = (req, res, next) => {
    const raffleBody = req.body;

    for (const field of raffle_fields){
        if (!raffleBody.hasOwnProperty(field)){
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

    for (const field in raffleBody){
        if (typeof raffleBody[field] !== 'string'){
            return res.status(400).json({ error: `'${raffleBody[field]}' field must be a string.` })
        }

    }

    next();
}

module.exports = { validateId, validateRaffle }