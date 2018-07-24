const DataTypes = require('sequelize').DataTypes
const db = require('../service/db')

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
// STRING TEXT INTEGER DATE DATEONLY BOOLEAN
// type, allowNull, defaultValue, unique, autoIncrement, primaryKey

/*
 * 用户表
 */
const User = db.define('user', {

},  {
  freezeTableName: true,
  // 逻辑删除
  paranoid: true
})

// User.sync().then(function () {
//   console.log('User sync')
// })

module.exports = User