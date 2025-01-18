const Usuarios = require('../models/Usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registrarUsuario = async(req, res) => {

    //Leer los datos del usuarios y colocarlos en Usuarios
    const usuario = new Usuarios(req.body)
    usuario.password = await bcrypt.hash(req.body.password, 12)

    try {
        await usuario.save()
        res.json({mensaje: 'Usuario Creado Correctamente'})

    } catch (error) {
        console.log(error)
        res.json({mensaje: 'hubo un error'})
    }
}

exports.autenticarUsuario = async(req, res, next) => {

    //Buscar el usuario
    const {email, password} = req.body
    const usuario = await Usuarios.findOne({email})

    if(!usuario){
        //Si el usuario no existe
        await res.status(401).json({mensaje: 'Ese usuario no existe'})
        next()
    } else {
        //el usuario existe
            //verificar el password
        if(!bcrypt.compareSync(password, usuario.password)) {
            //si el pass es incorrecto
            await res.status(401).json({mensaje: 'Password Incorrecto'})
            next()
        } else {
            //pass correcto, firmar el token
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            },
            'LLAVESECRETA',
            {
                expiresIn: '1h'
            })

            //retornar el token
            res.json({token})
        }
    }

}