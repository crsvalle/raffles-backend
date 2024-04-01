const { Router } = require("express");
const { getAllRaffles, getRaffleById, createRaffle } = require("../queries/rafflesQueries")
const { getParticipantsOfRaffle, createParticipant} = require('../queries/participantsQueries')
const { validateId, validateRaffle, validateRaffleExist } = require("../validations/index")

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
            const raffle = await getRaffleById(id)
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

rafflesController.get('/:id/participants', validateId, validateRaffleExist,
    async (request, response) => {
        try {
            const { id } = request.params;
            const raffles = await getParticipantsOfRaffle(id)
            if (raffles) {
                response.status(200).json({ data: raffles });
            }
        }
        catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
);

rafflesController.post('/:id/participants', validateId, validateRaffleExist,
    async (request, response) => {
        try{
            const { id } = request.params;
            const participant = { raffle_id: id, ...request.body };
            const createdParticipant = await createParticipant(participant)
            if (createdParticipant){
                response.status(201).json({data: createdParticipant})
            }
        }catch(error){
            response.status(500).json({error: error.message})
        }
    }
)

rafflesController.post('/', validateRaffle, async (request, response) => {
    try {
        const createdRaffle = await createRaffle(request.body);
        if (createdRaffle) {
            response.status(201).json({ data: createdRaffle });
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

module.exports = rafflesController;