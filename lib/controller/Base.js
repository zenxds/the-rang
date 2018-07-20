class Controller {
  isAjax() {
    return this.ctx.get('x-requested-with') === 'XMLHttpRequest'
  }
}

module.exports = Controller