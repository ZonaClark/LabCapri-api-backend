const image = (sequelize, DataTypes) => {
  const Image = sequelize.define('image', {
    diagnosis: {
      type: DataTypes.STRING,
      defaultValue: 'unknown',
      allowNull: false,
      validate: { 
        notEmpty: true,
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  });

  Image.associate = models => {
    Image.belongsTo(models.User);
  };

  return Image;
};

export default image;
