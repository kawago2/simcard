// controllers/simcardsController.js
import Simcard from '../models/simcard.js';

const simcardsController = {
  getAllSimcards: async (req, res) => {
    try {
      const simcards = await Simcard.findAll();
      res.json(simcards);
    } catch (error) {
      console.error('Error fetching all simcards:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getSimcardById: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const simcard = await Simcard.findByPk(id);

      if (!simcard) {
        res.status(404).json({ message: 'SimCard not found' });
      } else {
        res.json(simcard);
      }
    } catch (error) {
      console.error(`Error fetching simcard with ID ${id}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addSimcard: async (req, res) => {
    const newSimCard = req.body;

    try {
      const simcard = await Simcard.create(newSimCard);

      // Returning the newly added SIM card data along with the generated ID
      res.status(201).json({ id: simcard.id, ...newSimCard });
    } catch (error) {
      console.error('Error adding new simcard:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default simcardsController;
