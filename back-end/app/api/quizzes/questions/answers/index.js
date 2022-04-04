const { Router } = require('express')
const { Answer } = require('../../../../models')

const { getQuestionFromQuiz } = require('../manager')
const { filterAnswersFromQuestion, getAnswerFromQuestion } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const answers = filterAnswersFromQuestion(question.id)
    res.status(200).json(answers)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
