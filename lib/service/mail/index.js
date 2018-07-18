/**
 * mail
 */
const nodemailer = require('nodemailer')
const extend = require('extend2')

const defaultOptions = {
  host: 'smtp.exmail.qq.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  user: '',
  password: ''
}

class Mail {
  constructor(options={}) {
    options = extend(true, {}, defaultOptions, options)
    
    this.options = options
    this.transporter = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      secure: options.secure, 
      auth: {
        user: options.user,
        pass: options.password
      }
    })
  }

  send(options={}) {
    options = extend({
      from: '',
      to: '',
      subject: '',
      html: ''
    }, options)

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(options, (error, info) => {
        if (error) {
          reject(error)
        } else {
          resolve(info)
        }
      })
    })
  }
}

module.exports = Mail
