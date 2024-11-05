export default (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant', {});
  
    Participant.associate = (models) => {
      Participant.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Participant.belongsTo(models.Team, { foreignKey: 'team_id', as: 'team' });
    };
  
    return Participant;
  };
  