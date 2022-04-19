const { Router } = require('express')
const { User } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const SeniorsRouter = require('./seniors')
const NotFoundError = require('../../utils/errors/not-found-error.js')

const router = new Router()

router.use('/:userId/seniors', SeniorsRouter)

router.get('/', (req, res) => {
  try {
    res.status(200).json(User.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:userId', (req, res) => {
  try {
    res.status(200).json(User.getById(req.params.userId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const user = User.create({ ...req.body })
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/login',(req, res) => {
  try {
    const user = req.body;
    const users = User.get();
    const u = users.filter(elem => elem.email === user.email && elem.password === user.password);
    if (u.length >= 1)
      res.status(201).json(u[0])
    else
      manageAllErrors(res,new NotFoundError('Invalid credentials'));
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:userId', (req, res) => {
  try {
    res.status(200).json(User.update(req.params.userId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:userId', (req, res) => {
  try {
    User.delete(req.params.userId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
