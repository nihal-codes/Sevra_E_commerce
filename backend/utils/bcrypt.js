let bcrypt;

try {
  bcrypt = require("bcrypt")
} catch (e) {
  console.warn('Native bcrypt unavailable, using bcryptjs instead')
  bcrypt = require('bcryptjs')
}

module.exports = bcrypt