import * as moment from 'moment'

export default {
  moment: function(time, format) {
    return moment(time).format(format)
  }
}
