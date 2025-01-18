const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')
const usuariosController = require('../controllers/usuariosController')

//Middleware para proteger las rutas
const auth = requite('../middleware/auth')


module.exports = function() {

    //Agrega nuevos clientes via POST
    router.post('/clientes',
        auth, 
        clienteController.nuevoCliente)

    //Obtener todos los clientes
    router.get('/clientes', 
        auth,
        clienteController.mostrarClientes)

    //Obtener un  cliente por su ID
    router.get('/clientes/:idCliente',
        auth, 
        clienteController.mostrarCliente)

    //Actualizar Cliente
    router.put('/clientes/:idCliente',
        auth, 
        clienteController.actualizarCliente)

    //Eliminar Cliente
    router.delete('/clientes/:idCliente', 
        auth,
        clienteController.eliminarCliente)

    /** PRODUCTOS */
    // Nuevos productos
    router.post('/productos', 
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto)
    
    //Obtener todos los productos
    router.get('/productos', 
        auth,
        productosController.mostrarProductos)

    //Obtener un  producto por su ID
    router.get('/productos/:idProducto', 
        auth,
        productosController.mostrarProducto)

    //Actualizar producto
    router.put('/productos/:idProducto',
        auth,
        productosController.subirArchivo, 
        productosController.actualizarProducto)

    //Eliminar producto
    router.delete('/productos/:idProducto', 
        auth,
        productosController.eliminarProducto)

    //Busqueda de productos
    router.post('/productos/busqueda/:query',
        auth,
        productosController.buscarProductos
    )

    /** Pedidos */
    // Nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', 
        auth,
        pedidosController.nuevoPedido)

    //Mostrar los Pedidos
    router.get('/pedidos', 
        auth,
        pedidosController.mostrarPedidos)

    //Obtener un  Pedidos por su ID
    router.get('/pedidos/:idPedidos', 
        auth,
        pedidosController.mostrarPedido)

    //Actualizar Pedidos
    router.put('/pedidos/:idPedidos', 
        auth,
        pedidosController.actualizarPedido)

    //Eliminar producto
    router.delete('/pedidos/:idPedidos', 
        auth,
        pedidosController.eliminarPedido)

    //Usuarios
    router.post('/crear-cuenta',
        usuariosController.registrarUsuario
    )

    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    )

    return router
}