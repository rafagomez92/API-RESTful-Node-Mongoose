const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const jwtToken = req.header('Authorization')

    if(!jwtToken) return res.status(401).send('Acceso Denegado. Se necesita ingresar un Token')

    try {
        const payload  = jwt.verify(jwtToken, process.env.SECRET_KEY)
        req.user = payload
        next()
    } catch(e) {
        res.status(400).send('Acceso Denegado. Token no valido')
    }

}

module.exports = auth