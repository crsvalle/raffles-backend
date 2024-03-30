const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
        return res.status(400).json({ error: 'id is not valid' })
    }

    next();
}


module.exports = { validateId }