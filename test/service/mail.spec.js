const config = require('config')
const { services } = require('../../lib')

const mailConfig = config.get('mail')

test('mail', (done) => {
  done()

  // const mail = new services.Mail({
  //   user: mailConfig.user,
  //   password: mailConfig.password
  // })

  // mail.send({
  //   from: mailConfig.from,
  //   to: mailConfig.user,
  //   subject: 'test',
  //   html: 'test content'
  // }).then(info => {
  //   expect(info).toBeTruthy()
  //   done()
  // }).catch(err => {
  //   done(err)
  // })
})