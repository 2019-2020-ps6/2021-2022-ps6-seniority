const { Router } = require('express')

const { QuizGame } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const {retrieveCurrentQuestion} = require("./manager");

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    QuizGame.getById(req.params.gameId)
    res.status(200).json(retrieveCurrentQuestion(req.params.gameId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
