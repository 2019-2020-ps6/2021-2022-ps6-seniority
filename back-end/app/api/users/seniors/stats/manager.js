const {QuizGame, Quiz} = require("../../../../models");

const filterQuizGameFromSenior = (seniorId) => {
  const quizGames = QuizGame.get()
  const parsedId = parseInt(seniorId, 10)
  return quizGames.filter((quizGame) => quizGame.seniorId === parsedId)
}

const filterQuizFromQuizGame = (quizId) => {
  const quizzes = Quiz.get()
  const parsedId = parseInt(quizId,10)
  return quizzes.filter(quiz => quiz.id === parsedId)[0]
}

module.exports = {
  filterQuizGameFromSenior,
  filterQuizFromQuizGame
}
