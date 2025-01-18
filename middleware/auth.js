const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    //autorizacion por el header
    const authHeader = req.get('Autorizacion')

    if(!authHeader) {
        const error = new Error('No autenticado, no hay JWT')
        error.statusCode = 401
        throw error
    }

    //Obtener el token y verificarlo
    const token = authHeader.split(' ')[1]
    let revisarToken
    try {
        revisarToken = jwt.verify(token, 'LLAVESECRETA')
        
    } catch (error) {
        error.statusCode = 500
        throw error    
    }

    //Si es un token valido, pero hay un error
    if(!revisarToken) {
        const error = new Error('No Autorizado')
        error.statusCode = 401
        throw error
    }

    next()

}