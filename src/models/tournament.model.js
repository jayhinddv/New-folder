export default (sequelize, DataTypes) => {
    const Tournament = sequelize.define('Tournament', {
      name: { type: DataTypes.STRING, allowNull: false },
      start_date: { type: DataTypes.DATE, allowNull: false },
      end_date: { type: DataTypes.DATE, allowNull: false },
      prize_pool: { type: DataTypes.FLOAT, defaultValue: 0 },
    });
  
    Tournament.associate = (models) => {
      Tournament.hasMany(models.League, { foreignKey: 'tournament_id', as: 'leagues' });
    };
  
    return Tournament;
  };
  