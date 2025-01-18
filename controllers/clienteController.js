const Clientes = require('../models/Clientes')

//Agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body)

    try {
        //Almacenar el registro
        await cliente.save()
        res.json({mensaje: 'Se Agrego un nuevo cliente'})

    } catch (error) {
        console.log(error)
        next()
    }

}

//Muestra todos los Clientes

exports.mostrarClientes = async (req, res, next) => {

    try {
        const clientes = await Clientes.find({})
        res.json(clientes)
        
    } catch (error) {
        console.log(error)
        next()
    }

}

//Muestra un Clientes por su ID
exports.mostrarCliente = async (req, res, next) => {

    const cliente = await Clientes.findById(req.params.idCliente)
        
    if(!cliente){
        res.json({mensaje: 'Ese cliente no existe'})
        next()
    }

    //Si todo esta correcto mostrar cliente
    res.json(cliente)

}

//Actualiza cliente por ID
exports.actualizarCliente = async (req, res, next) => {

    try {
        const cliente = await Clientes.findByIdAndUpdate({ _id: req.params.idCliente },
            req.body, {
                new: true
            }
        )
        res.json(cliente)

    } catch (error) {
        console.log(error)
        next()
    }

}

//Elimina un cliente
exports.eliminarCliente = async (req, res, next) => {

    try {
        const cliente = await Clientes.findByIdAndDelete({ _id: req.params.idCliente })
        res.json({mensaje: 'Se elimino al Cliente'})

    } catch (error) {
        console.log(error)
        next()
    }

}