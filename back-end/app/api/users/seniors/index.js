const { Router } = require('express')

const { User, Senior} = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const {filterSeniorsFromUser, getSeniorFromUser} = require("./manager");

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if userId exists, if not it will throw a NotFoundError
    User.getById(req.params.userId)
    res.status(200).json(filterSeniorsFromUser(req.params.userId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:seniorId', (req, res) => {
  try {
    const senior = getSeniorFromUser(req.params.userId, req.params.seniorId)
    res.status(200).json(senior)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    // Check if userId exists, if not it will throw a NotFoundError
    User.getById(req.params.quizId)
    const userId = parseInt(req.params.quizId, 10)
    let senior = Senior.create({ label: req.body.label, quizId: userId })
    res.status(201).json(senior)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:seniorId', (req, res) => {
  try {
    const senior = getSeniorFromUser(req.params.quizId, req.params.questionId)
    const updatedSenior = Senior.update(req.params.questionId, { label: req.body.label, quizId: senior.quizId })
    res.status(200).json(updatedSenior)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    // Check if the question id exists & if the question has the same quizId as the one provided in the url.
    getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    Question.delete(req.params.questionId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:questionId/answers', () => {

})

module.exports = router
