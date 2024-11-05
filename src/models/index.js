import { Sequelize } from 'sequelize';
import config from '../config/config.js';  // Ensure the path is correct
import logger from '../config/logger.js';
import User from './user.model.js';
import token from './token.model.js';
import  Participant  from './participant.model.js';
import MatchResult from './matchResult.model.js';
import League from './league.model.js';
import Game from './game.model.js';
import Tournament from './tournament.model.js';
import Team from './team.model.js';


// Extract the correct configuration for the current environment (e.g., development)
const sequelizeConfig = config.sequelize.development;

// Initialize Sequelize using the extracted config
const sequelizeInstance = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  {
    host: sequelizeConfig.host,
    dialect: sequelizeConfig.dialect,
    dialectOptions: sequelizeConfig.dialectOptions,
    pool: {
      min: 0,
      max: 100,
      acquire: 5000,
      idle: 1000,  // corrected from "Idle" to "idle"
    },
  }
);

const db = {};

// Authenticate the database connection
sequelizeInstance
  .authenticate()
  .then(() => logger.info('DB connected'))
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });

// Initialize models
db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

db.User = User(sequelizeInstance, Sequelize);
db.tokens = token(sequelizeInstance, Sequelize);
db.Participant = Participant(sequelizeInstance, Sequelize);
db.MatchResult = MatchResult(sequelizeInstance, Sequelize);
db.League = League(sequelizeInstance, Sequelize);
db.Game = Game(sequelizeInstance,Sequelize);
db.Tournament = Tournament(sequelizeInstance,Sequelize);
db.Team = Team(sequelizeInstance,Sequelize);

//= ==============================
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});


export default db;