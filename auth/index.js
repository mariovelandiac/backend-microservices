const jwt = require('jsonwebtoken');
const {config} = require('../config/config.js');


function sign(data) {
  return jwt.sign(data, config.jwtsecret)
}

const check = {
  own: function own(req, owner) {
      const decoded = decodeHeader(req);
      if (decoded.id !== owner) {
        throw new Error('Unauthorized')
      }
  },
};

// esto era lo que hacia passport.js en esta parte va a extraer el token de la cabecera
function getToken(auth) {
  if (!auth) {
    throw new Error('Token is Missed')
  }

  if (auth.indexOf('Bearer') === -1) {
    throw new Error('Formato invalido')
  }
  const token = auth.replace('Bearer ', '');
  return token
}

function verify(token) {
  return jwt.verify(token, config.jwtsecret);
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);
  // decoded es el cuerpo del token
  console.log(decoded)
  return decoded
}

module.exports = {
  sign,
  check
}
