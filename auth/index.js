const jwt = require('jsonwebtoken');
const {config} = require('../config/config.js');
const error = require('./../utils/error')


function sign(data) {
  return jwt.sign(data, config.jwtsecret)
}

// esta parte hace lo que hace la estrategía de passport de JWT
const check = {
  own: function own(req, owner) {
      const decoded = decodeHeader(req);
      if (decoded.id !== owner) { // esta línea hace un autenticador de indentidad entre el body y el JWT, creo que lo ideal también sería autenticar identidad con el usuario registrado en la DB y el JWT
        throw error('Unauthorized', 401)
      }
  },
  logged: function logged(req) {
    decodeHeader(req);
  },
};

// esto era lo que hacia passport.js en esta parte va a extraer el token de la cabecera
function getToken(auth) {
  if (!auth) {
    throw error('Token is Missed', 400)
  }

  if (auth.indexOf('Bearer') === -1) {
    throw error('Formato invalido', 400)
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
  req.user = decoded;
  return decoded
}

module.exports = {
  sign,
  check
}
