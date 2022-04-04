const { Router } = require('express')

const { QuizGame, Quiz} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const CurrentQuestionRouter = require('./current_questions')
const router = new Router()

router.use('/:gameId/currentQuestion', CurrentQuestionRouter)

router.get('/', (req, res) => {
  try {
    res.status(200).json(QuizGame.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:gameId', (req, res) => {
  try {
    res.status(200).json(QuizGame.getById(req.params.gameId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const user = QuizGame.create({ ...req.body })
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:gameId', (req, res) => {
  try {
    res.status(200).json(QuizGame.update(req.params.gameId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:gameId', (req, res) => {
  try {
    QuizGame.delete(req.params.gameId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
