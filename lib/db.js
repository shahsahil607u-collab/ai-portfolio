const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  console.warn('MONGODB_URI not set. DB calls will fail until configured.')
}

let cached = global._mongo
if (!cached) {
  cached = global._mongo = { conn: null, promise: null }
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      autoIndex: true,
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => ({ conn: mongoose }))
  }
  cached.conn = await cached.promise
  return cached.conn
}

module.exports = { connectToDatabase }
