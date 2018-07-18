const moment = require('moment')

module.exports = {
  moment: function(time, format) {
    return moment(time).format(format)
  }
}