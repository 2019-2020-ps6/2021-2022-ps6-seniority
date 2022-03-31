const { User, Senior } = require('../../../models')
const NotFoundError = require('../../../utils/errors/not-found-error.js')

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

/**
 * filterQuestionsFromQuizz.
 * This function filters among the questions to return only the question linked with the given userId.
 * @param userId
 */
const filterSeniorsFromUser = (userId) => {
  const seniors = Senior.get()
  const parsedId = parseInt(userId, 10)
  return seniors.filter((senior) => senior.userId === parsedId)
}

/**
 * getQuestionFromQuiz.
 * This function retrieves a question from a quiz. It will throw a not found exception if the userId in the question is different from the one provided in parameter.
 * @param userId
 * @param seniorId
 */
const getSeniorFromUser = (userId, seniorId) => {
  // Check if userId exists, if not it will throw a NotFoundError
  const user = User.getById(userId)
  const userIdInt = parseInt(userId, 10)
  const senior = Senior.getById(seniorId)
  if (senior.userId !== userIdInt) throw new NotFoundError(`${senior.name} id=${seniorId} was not found for ${user.name} id=${user.id} : not found`)
  return senior
}

module.exports = {
  filterSeniorsFromUser,
  getSeniorFromUser,
}
