const crypto = require("crypto");

/** Sync */
function randomStringAsBase64Url(size) {
  return crypto.randomBytes(size).toString("base64url");
}

module.exports = randomStringAsBase64Url