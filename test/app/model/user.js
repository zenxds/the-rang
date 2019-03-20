module.exports = (sequelize, DataTypes) => {
  /*
  * 用户表
  */
  const User = sequelize.define('user', {

  },  {
    freezeTableName: true,
    // 逻辑删除
    paranoid: true
  })

  return User
}