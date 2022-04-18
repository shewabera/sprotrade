import dataProviderModule from '../repo/dataRepo'
const dataProvider = new dataProviderModule()

export default class betsHandler {
  constructor () {}

  async insertBet (data) {
    try {
      let result = await dataProvider
        .insert('bets', data)
        .catch(err => console.log(err))
      return result
    } catch (err) {
      console.log(`Error occured in bets handler : ${err.message}`)
      throw err
    }
  }

  async findAndSort (sortBy, sortOrder) {
    let projection = {
      input: 1,
      maxProfit: 1
    }
    let result = await dataProvider
      .findAndSort('bets', sortBy, sortOrder, projection)
      .catch(err => console.log(err))
    return result
  }
  catch (err) {
    console.log(`Error occured in bets handler : ${err.message}`)
    throw err
  }
}
