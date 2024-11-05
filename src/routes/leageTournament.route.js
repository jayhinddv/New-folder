import express from 'express';
import auth from '../middlewares/auth.js';
import leageTournamentController from '../controllers/leageTournament.controller.js';

const router = express.Router();

router.get('/tournaments',auth(), leageTournamentController.getTournament);
router.post('/leagues/:leagueId/teams',auth(), leageTournamentController.getLeageById);
router.get('/leagues/:leagueId',auth(), leageTournamentController.leageDetailsWithTeam);
router.post('/matches',auth(), leageTournamentController.submitMatchResult);
export default router;