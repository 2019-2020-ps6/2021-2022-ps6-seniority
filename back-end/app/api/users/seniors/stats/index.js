const { Router } = require('express')

const {Senior} = require('../../../../models')
const manageAllErrors = require('../../../../utils/routes/error-management')
const {filterQuizGameFromSenior, filterQuizFromQuizGame} = require("./manager");

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if userId exists, if not it will throw a NotFoundError
    Senior.getById(req.params.seniorId)
    const quizGames = filterQuizGameFromSenior(req.params.seniorId)
    if (quizGames.length <= 0)
      res.status(200).json({
        totalNumberOfGames : 0,
        percent : 0
      })
    else
    {
      const totalRound = quizGames.length > 1 ? quizGames.map(q => q.round).reduce((q1,q2) => q1 + q2) + quizGames.length : quizGames[0].round + 1;
      const totalPoints = quizGames.length > 1 ? quizGames.map(q => q.points).reduce((q1,q2) => q1 + q2) : quizGames[0].points;
      const statObject = {
        totalNumberOfGames : quizGames.length,
        percent : totalPoints / totalRound * 100,
      }
      res.status(200).json(statObject)
    }
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
