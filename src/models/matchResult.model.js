export default (sequelize, DataTypes) => {
    const MatchResult = sequelize.define('MatchResult', {
      score: { type: DataTypes.INTEGER, allowNull: false },
      result: { type: DataTypes.STRING, allowNull: false },
    });
  
    MatchResult.associate = (models) => {
      MatchResult.belongsTo(models.Team, { foreignKey: 'team_id', as: 'team' });
    };
  
    return MatchResult;
  };
  