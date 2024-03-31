const { Router } = require("express");
const { getAllRaffles, getRaffleById } = require("../queries/rafflesQueries")
const { getParticipantsOfRaffle } = require('../queries/participantsQueries')
const { validateId } = require("../validations/index")

const rafflesController = Router();

rafflesController.get('/', async (request, response) => {
    try {
        const raffles = await getAllRaffles()
        if (raffles[0]) {
            response.status(200).json({ data: raffles })
        } else {
            response.status(404).json({ error: "No raffles Available" })
        }
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
})

rafflesController.get("/:id", validateId,
    async (request, response) => {
        try {
            const { id } = request.params;
            const raffle = await getRaffleById(Number(id))
            if (raffle) {
                response.status(200).json({ data: raffle });
            } else {
                return response.status(404).json({ error: `id: ${id} is not found` })
            }
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    },
);

rafflesController.get('/:id/participants', validateId,
    async (request, response) => {
        try {
            const { id } = request.params;
            const checkIfExist = await getRaffleById(Number(id))
            if (!checkIfExist) {
                return response.status(404).json({ error: `id: ${id} is not found` })
            }
            const raffles = await getParticipantsOfRaffle(Number(id))
            if (raffles) {
                response.status(200).json({ data: raffles });
            }
        }
        catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
)

module.exports = rafflesController;