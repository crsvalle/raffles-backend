const { Router } = require("express");
const { getAllParticipants } = require('../queries/participantsQueries')

const participantsController = Router();

participantsController.get('/', async (request, response) => {
    try {
        const participants = await getAllParticipants()
        response.status(200).json({ data: participants })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
})

module.exports = participantsController;