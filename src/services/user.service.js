import httpStatus from 'http-status';
import db from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import moment from 'moment/moment.js';
// Fetch a user by mobile number
export const updateEmailName = async (name, email, id ) => {
  try {
    const user = await db.User.findByPk(id);
    if(!user){
      return  new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    user.email = email;
    user.name  = name ;
    await user.save();
    return {
      success: true,
      message: 'updated sucessfully',
    };
  }catch(e){
    return {
      success: false,
      message: ' not updated ',
    };
  }
  };
  export const home = async () => {
    try {
      const [upcomingLeagues, ongoingLeagues, topTeams, featuredGames] = await Promise.all([
        db.League.findAll({
          where: { status: 'upcoming' },
          attributes: ['id', 'name', 'status'],
          limit: 5,
        }),
        db.League.findAll({
          where: { status: 'ongoing' },
          attributes: ['id', 'name', 'status'],
          limit: 5,
        }),
        db.Team.findAll({
          order: [['score', 'DESC']],
          attributes: ['id', 'name', 'score'],
          limit: 5,
        }),
        db.Game.findAll({
          attributes: ['id', 'name'],
          limit: 5,
        }),
      ]);
  
      return {
        success: true,
        data: {
          upcomingLeagues,
          ongoingLeagues,
          topTeams,
          featuredGames,
        },
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
    };
