module.exports = (sequelize, DataTypes) => {
  const Empty = sequelize.define('empty', {

  },  {
    freezeTableName: true,
    // 逻辑删除
    paranoid: true
  })

  return Empty
}