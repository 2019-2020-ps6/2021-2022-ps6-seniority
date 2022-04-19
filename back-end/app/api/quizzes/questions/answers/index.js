const { Router } = require('express')
const { Answer, Quiz} = require('../../../../models')
const gtts = require('node-gtts')('fr');

const { getQuestionFromQuiz } = require('../manager')
const { filterAnswersFromQuestion, getAnswerFromQuestion } = require('./manager')
const manageAllErrors = require("../../../../utils/routes/error-management");

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const answers = filterAnswersFromQuestion(question.id)
    res.status(200).json(answers)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.get('/audio',(req,res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const answers = filterAnswersFromQuestion(question.id);
    let str = "";
    for (let i = 0; i < answers.length; i++)
      str += `Réponse numéro ${i + 1}..` + answers[i].value + ";";
    res.set({'Content-Type' : 'audio/mpeg'});
    gtts.stream(str).pipe(res);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
});

router.post('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId)
    const questionId = parseInt(req.params.questionId, 10)
    let answer = Answer.create({ questionId, ...req.body })
    res.status(201).json(answer)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
