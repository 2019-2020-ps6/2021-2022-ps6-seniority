
const {QuizGame} = require('../../../models')
const {filterQuestionsFromQuizz} = require("../../quizzes/questions/manager");


module.exports.retrieveCurrentQuestion =  (idGame) => {
  const game = QuizGame.getById(idGame)
  const questions = filterQuestionsFromQuizz(game.quizId)
  return questions[game.round]
}

