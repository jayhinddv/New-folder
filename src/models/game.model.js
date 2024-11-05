export default (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_polular: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  
    Game.associate = (models) => {
        Game.hasMany(models.Tournament, { 
          foreignKey: 'game_id', 
          as: 'tournaments',
        });
      };
  
    return Game;
  };
  