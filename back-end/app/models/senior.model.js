const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Senior', {
  name: Joi.string().required(),
  surname: Joi.string().required(),
  birthdate: Joi.string().required(),
  handicap: Joi.string().required(),
  userId: Joi.number().required(),
})
