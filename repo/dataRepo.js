import { reject, resolve } from 'core-js/fn/promise'

var mongoClient = require('mongodb').MongoClient
var db = null
var self

export default class mongoDataProvider {
  constructor () {
    self = this
  }

  getDb () {
    return new Promise((resolve, reject) => {
      if (db != null) {
        return resolve()
      } else {
        var mongoUri =
          'mongodb://mongo:27017/sportradedb?readPreference=primary&directConnection=true&ssl=false'
        mongoClient.connect(mongoUri, {}, function (err, client) {
          if (err) {
            return reject(err)
          }
          db = client.db('sportradedb')
          return resolve()
        })
      }
    })
  }

  insert (collectionName, data) {
    return new Promise((resolve, reject) => {
      this.getDb()
        .then(() => {
          let collection = db.collection(collectionName)
          collection
            .insertOne(data)
            .then(result => {
              resolve(result)
            })
            .catch(err => reject(err))
        })
        .catch(connectionErr => {
          return reject(connectionErr)
        })
    })
  }
  $
  findAndSort (collectionName, sortBy, sortOrder, projection) {
    let sort = {}
    sort[sortBy] = sortOrder
    return new Promise((resolve, reject) => {
      this.getDb()
        .then(() => {
          let collection = db.collection(collectionName)
          collection
            .find({})
            .project(projection)
            .sort(sort)
            .toArray((err, result) => {
              if (err) {
                return reject(err)
              }
              return resolve(result)
            })
        })

        .catch(err => {
          return reject(err)
        })
    })
  }
}
