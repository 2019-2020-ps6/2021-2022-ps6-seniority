const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('HandicapConfig', {
  seniorId : Joi.number(),
  name : Joi.string(),
  config : Joi.object(),
})
