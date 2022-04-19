const { Router } = require('express')

const { User, HandicapConfig} = require('../../../../models')
const manageAllErrors = require('../../../../utils/routes/error-management')
const {getSeniorFromUser} = require("../manager");
const {filterHandicapsFromSeniors} = require("./manager");

const router = new Router({ mergeParams: true })

router.post('/', (req, res) => {
  try {
    // Check if userId exists, if not it will throw a NotFoundError
    User.getById(req.params.userId)
    const seniorId = parseInt(req.params.seniorId, 10)
    let handicapConfig = HandicapConfig.create({ seniorId, ...req.body })
    res.status(201).json(handicapConfig)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:handicapId', (req, res) => {
  try {
    // Check if userId exists, if not it will throw a NotFoundError
    User.getById(req.params.userId)
    let handicapConfig = HandicapConfig.update(req.params.handicapId,{ ...req.body })
    res.status(201).json(handicapConfig)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/',(req, res) => {
  try {
    const senior = getSeniorFromUser(req.params.userId, req.params.seniorId)
    const handicaps = filterHandicapsFromSeniors(senior.id)
    res.status(200).json(handicaps)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
