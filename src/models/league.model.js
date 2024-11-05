export default (sequelize, DataTypes) => {
    const League = sequelize.define('League', {
      name: { type: DataTypes.STRING, allowNull: false },
      start_date: { type: DataTypes.DATE, allowNull: false },
      end_date: { type: DataTypes.DATE, allowNull: false },
      status: { type: DataTypes.ENUM('upcoming', 'ongoing', 'completed'), defaultValue: 'upcoming' },
      
    });
  
    League.associate = (models) => {
      League.belongsTo(models.Tournament, { foreignKey: 'tournament_id', as: 'tournament' });
      League.hasMany(models.Team, { foreignKey: 'league_id', as: 'teams' });
    };
  
    return League;
  };
  