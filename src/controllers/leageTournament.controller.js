import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import db from '../models/index.js'
const getTournament = catchAsync(
    async (req, res, next) => {
      try {
        const tournaments = await db.Tournament.findAll({
          include: [{ model: db.League, as: 'leagues' }],
        });
        res.json(tournaments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
);
const  getLeageById = catchAsync(
async (req, res) => {
    try {
      const { name } = req.body;
      const { leagueId } = req.params;
  
      const team = await db.Team.create({ name, league_id: leagueId });
      res.status(201).json(team);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }  
)
const leageDetailsWithTeam = catchAsync(
  async (req, res) => {
    try {
      const league = await db.League.findOne({
        where: { id: req.params.leagueId },
        include: [{ model: db.Team, as: 'teams' }],
      });
      if (!league) {
        return res.status(404).json({ message: 'League not found' });
      }
      res.json(league);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
)
const submitMatchResult = catchAsync(async (req, res) => {
  try {
    const { team_id, score, result } = req.body;
    const matchResult = await db.MatchResult.create({ team_id, score, result });
    res.status(201).json(matchResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
export default {
getTournament,
getLeageById,
leageDetailsWithTeam,
submitMatchResult
};
