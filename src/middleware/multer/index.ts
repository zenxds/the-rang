// 文件上传
// https://github.com/koa-modules/multer/blob/master/index.js
// router.post('/upload', upload.single('file'), async (ctx, next) => {})

'use strict'

/*!
 * multer
 * Copyright(c) 2014 Hage Yaapa
 * Copyright(c) 2015 Fangdun Cai
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

import * as originalMulter from 'multer'

export function multer(options) {
  const m = originalMulter(options)

  makePromise(m, 'any')
  makePromise(m, 'array')
  makePromise(m, 'fields')
  makePromise(m, 'none')
  makePromise(m, 'single')

  return m
}

function makePromise(multer, name) {
  if (!multer[name]) return

  const fn = multer[name]

  multer[name] = function() {
    const middleware = fn.apply(this, arguments)

    return (ctx, next) => {
      return new Promise((resolve, reject) => {
        middleware(ctx.req, ctx.res, err => {
          err ? reject(err) : resolve(ctx)
        })
      }).then(next)
    }
  }
}

multer.diskStorage = originalMulter.diskStorage
multer.memoryStorage = originalMulter.memoryStorage
