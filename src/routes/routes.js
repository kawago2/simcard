// routes/routes.js
import express from 'express';
import simcardsController from '../controllers/simcardsController.js';

const router = express.Router();

// Route: GET all simcards
router.get('/simcards', simcardsController.getAllSimcards);

// Route: GET simcard by ID
router.get('/simcards/:id', simcardsController.getSimcardById);

// Route: POST a new simcard
router.post('/simcards', simcardsController.addSimcard);

export default router;
