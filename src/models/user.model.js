export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [10, 15], 
          notEmpty: true, 
        },
      },
      otp_code: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [6, 6], 
        },
      },
      name : {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true, 
        },
      },
      otp_expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      otp_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isProfileApprove: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
      },
      role : {
        type: DataTypes.INTEGER,
        allowNull:false ,
        defaultValue:2
      },
      profile_pic_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true, 
        },
      },
    });
  
    User.associate = (models) => {
      User.hasMany(models.Participant, { foreignKey: 'user_id' });
    };
    
    return User;
  };
  
  