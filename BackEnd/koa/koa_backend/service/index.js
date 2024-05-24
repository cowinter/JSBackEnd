'use strict'

const config = require('../config')
const logger = require('../lib/logger')


const TokenModel = require('./token')

let MongoData, MySqlData, RedisData

!(async () => {
  MongoData = require('../models/mongo')

  MySqlData = await require('../models/mysql')

  RedisData = await require('../models/redis')

  if (MongoData) {
    try {
      // 创建示例数据
      await TokenModel.upsert({
        name: 'funnyzak',
        token: 'helloworld',
        app: 'transfer',
        relationId: 1
      })

      await require('./file-object').upsert({
        hash: 'hello world'
      })
    } catch (error) {
      logger.error(
        `MongoDB connected failed. error=> ${error.message}`
      )
    }
  }
})()

module.exports.MongoData = MongoData
module.exports.RedisData = RedisData
module.exports.MySqlData = MySqlData
module.exports.config = config
