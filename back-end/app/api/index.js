const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const QuizGameRouter = require('./game')
const ThemeRouter = require('./themes')
const HandicapStaticRouter = require('./users/seniors/handicap/static')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/game', QuizGameRouter)
router.use('/themes', ThemeRouter)
router.use('/handicaps',HandicapStaticRouter)

module.exports = router
