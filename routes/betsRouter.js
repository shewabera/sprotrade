import betHandler from '../handlers/betHandler'
import { onlyNumbers } from '../utils/utils'
import 'core-js/'
const betHandlerService = new betHandler()

var express = require('express')
var router = express.Router()

router.post('/bets/CalculateMaximumProfit', async function (req, res) {
  try {
    const { bets } = req.body
    let profitSummary = []
    if (!Array.isArray(bets) || !onlyNumbers(bets))
      throw new Error('Input Must be an array of numbers')
    bets.forEach((element, index) => {
      const max = Math.max(...bets.slice(index + 1))
      profitSummary.push({
        betPrice: element,
        maxBetPrice: max,
        maxProfit: max - element
      })
    })
    const maxProfit = Math.max(...profitSummary.map(elem => elem.maxProfit))
    const dbEntry = {
      input: bets,
      profitSummary,
      maxProfit,
      insertedOn: new Date()
    }
    const result = await betHandlerService
      .insertBet(dbEntry)
      .catch(err => console.log(`Oops : ${err.message}`))
    if (result) res.send(dbEntry)
  } catch (err) {
    res.statusCode = 500
    res.send({ error: err.message })
  }
})

router.get('/bets', async function (req, res) {
  const sortBy = req.query.sortBy || 'maxProfit'
  const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1
  try {
    let result = await betHandlerService.findAndSort(sortBy, sortOrder)
    res.send(result)
  } catch (err) {
    res.statusCode = 500
    res.send({ error: err.message })
  }
})

module.exports = router
