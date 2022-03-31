const { User } = require('../../models')
const {filterSeniorsFromUser} = require("./seniors/manager");


/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param userId
 */
const buildUser = (userId) => {
  const user = User.getById(userId)
  return { ...user}
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildUsers = () => {
  const users = User.get()
  return users.map((user) => buildUser(user.id))
}

module.exports = {
  buildUser,
  buildUsers,
}
