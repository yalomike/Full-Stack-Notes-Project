module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define("Notes", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Notes.associate = (models) => {
    Notes.belongsTo(models.Users, {
      onDelete: "cascade",
    });
  };

  return Notes;
};
