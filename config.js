module.exports = {
  host: process.env.HOST || 'localhost',
  mongo: {
    uri: process.env.MONGO_URL || 'mongodb://localhost:27017/NKO'
  },
  port: process.env.PORT || 8000
}
