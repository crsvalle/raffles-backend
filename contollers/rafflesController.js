const { Router } = require("express");
const { getRaffleById } = require("../queries/rafflesQueries")
const { validateId } = require("../validations/index")
const rafflesController = Router();


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
        } catch (err) {
            response.status(500).json({ error: err.message });
        }
    },
);

module.exports = rafflesController;