const { Router } = require('express')

const { User, Senior} = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const {filterSeniorsFromUser, getSeniorFromUser} = require("./manager");
const HandicapsRouter = require('./handicap');
const StatsRouter = require('./stats');

const router = new Router({ mergeParams: true })

router.use('/:seniorId/handicaps', HandicapsRouter)
router.use('/:seniorId/stats',StatsRouter)

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
    User.getById(req.params.userId)
    const userId = parseInt(req.params.userId, 10)
    let senior = Senior.create({ userId : userId, ...req.body })
    res.status(201).json(senior)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:seniorId', (req, res) => {
  try {
    const senior = getSeniorFromUser(req.params.userId, req.params.seniorId)
    const updatedSenior = Senior.update(req.params.seniorId, { userId : senior.userId, ...req.body })
    console.log(updatedSenior)
    res.status(200).json(updatedSenior)
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err)
  }
})

router.delete('/:seniorId', (req, res) => {
  try {
    // Check if the question id exists & if the question has the same quizId as the one provided in the url.
    getSeniorFromUser(req.params.userId, req.params.seniorId)
    Senior.delete(req.params.seniorId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
