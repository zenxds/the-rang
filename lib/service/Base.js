class Service {
  constructor(app) {
    this.app = app
  }

  // 由子类重写
  init() {}
}

module.exports = Service