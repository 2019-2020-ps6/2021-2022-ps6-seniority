const { Router } = require('express')

const router = new Router();

const handicaps = [
  "Glaucome",
  "Daltonisme",
]

router.get('/',(req, res) => {
  res.status(200).json(handicaps)
})

module.exports = router;
