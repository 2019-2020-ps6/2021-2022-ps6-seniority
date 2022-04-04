const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizGame', {
  quizId: Joi.number(),
  points: Joi.number(),
  round: Joi.number()
})
