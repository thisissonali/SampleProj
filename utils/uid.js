const crypto = require("crypto");

/** Sync */
function randomStringAsBase64Url(size = 10) {
  return crypto.randomBytes(size).toString("base64");
}
module.exports = randomStringAsBase64Url