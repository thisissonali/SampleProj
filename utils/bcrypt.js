const bcrypt = require('bcrypt');
const saltRounds = 10;

const getHash = async (text) => {
  const hash = await bcrypt.hash(text, saltRounds);
  return hash;
}

const matchHash = async  (text, hash) => { 
 const result = await bcrypt.compare(text, hash);
 return result;
}


module.exports = {
    getHash,
    matchHash
}