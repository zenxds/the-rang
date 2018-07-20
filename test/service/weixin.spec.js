const config = require('config')
const Weixin = require('../../lib/service/Weixin')

const weixin = new Weixin(config.get('weixin'))

describe('weixin', () => {
  test('it should init', () => {
    expect(weixin.apiServer).toBeTruthy()
    expect(weixin.cache).toBeTruthy()
  })

  test('it should get access token', async() => {
    let token = await weixin.getAccessToken()

    expect(token).toBeTruthy()
  })

  test('it should get js ticket', async() => {
    let ticket = await weixin.getJSTicket()

    expect(ticket).toBeTruthy()
  })

  test('it should sign ticket', async() => {
    let ticket = await weixin.getJSTicket()
    let sign = weixin.signTicket(ticket, 'https://growth.dingxiang-inc.com')

    expect(sign.ticket).toBe(ticket)
    expect(sign.signature).toBeTruthy()
  })
})