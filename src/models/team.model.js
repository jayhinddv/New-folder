export default (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
      name: { type: DataTypes.STRING, allowNull: false },
      points: { type: DataTypes.INTEGER, defaultValue: 0 },
    });
  
    Team.associate = (models) => {
      Team.belongsTo(models.League, { foreignKey: 'league_id', as: 'league' });
      Team.hasMany(models.Participant, { foreignKey: 'team_id', as: 'participants' });
    };
  
    return Team;
  };
  