const Pedidos = require('../models/Pedidos')

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body)

    try {
        await pedido.save()
        res.json({mensaje: 'Se Agrego un nuevo pedido'})

    } catch (error) {
        console.log(error)
        next()
    }

}

exports.mostrarPedidos = async (req, res, next) => {

    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
        res.json(pedidos)
        
    } catch (error) {
        console.log(error)
        next()
    }

}

exports.mostrarPedido = async (req, res, next) => {

    const pedido = await Pedidos.findById(req.params.idPedidos).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    })
        
    if(!pedido){
        res.json({mensaje: 'Ese producto no existe'})
        return next()
    }

    //Si todo esta correcto mostrar cliente
    res.json(pedido)

}

exports.actualizarPedido = async (req, res, next) => {

    try {
        let pedido = await Pedidos.findByIdAndUpdate({ _id: req.params.idPedidos },
            req.body, {
                new: true
            }
        ).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
        res.json(pedido)

    } catch (error) {
        console.log(error)
        next()
    }

}

exports.eliminarPedido = async (req, res, next) => {

    try {
        await Pedidos.findByIdAndDelete({ _id: req.params.idPedidos })
        res.json({mensaje: 'Se elimino el pedido'})

    } catch (error) {
        console.log(error)
        next()
    }

}