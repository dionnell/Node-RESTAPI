const Productos = require('../models/Productos')
const multer = require('multer')
const shortid = require('shortid')

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1]
            cb(null, `${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb( new Error('formato no valido'))
        }
    }
}
//Pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen')

//Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next()
    })
}

//Agrega un nuevo cliente
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body)

    try {
        //Almacenar el registro
        if(req.file.filename) {
            producto.imagen = req.file.filename
        }

        await producto.save()
        res.json({mensaje: 'Se Agrego un nuevo producto'})

    } catch (error) {
        console.log(error)
        next()
    }

}

//Muestra todos los Productos

exports.mostrarProductos = async (req, res, next) => {

    try {
        const productos = await Productos.find({})
        res.json(productos)
        
    } catch (error) {
        console.log(error)
        next()
    }

}

//Muestra un Producto por su ID
exports.mostrarProducto = async (req, res, next) => {

    const producto = await Productos.findById(req.params.idCliente)
        
    if(!producto){
        res.json({mensaje: 'Ese producto no existe'})
        next()
    }

    //Si todo esta correcto mostrar cliente
    res.json(producto)

}

//Busqueda de Productos
exports.buscarProductos = async (req, res, next) => {
    try {
        //obtener el query
        const {query} = req.params
        const producto = await Productos.find({nombre: new RegExp(query, 'i')})

        res.json(producto)
    } catch (error) {
        console.log(error)
        next()
    }
}

//Actualiza Producto por ID
exports.actualizarProducto = async (req, res, next) => {

    try {
        let productoAnt = await Productos.findById(req.params.idProducto)

        //construir producto
        let nuevoProducto = req.body

        //Verificar si viene imagen
        if(req.file){
            nuevoProducto.imagen = req.file.filename
        } else {
            nuevoProducto.imagen = producto.imagen
        }

        let producto = await Productos.findByIdAndUpdate({ _id: req.params.idProducto },
            nuevoProducto, {
                new: true
            }
        )
        res.json(producto)

    } catch (error) {
        console.log(error)
        next()
    }

}

//Elimina un Producto
exports.eliminarProducto = async (req, res, next) => {

    try {
        const producto = await Productos.findByIdAndDelete({ _id: req.params.idProducto })
        res.json({mensaje: 'Se elimino el producto'})

    } catch (error) {
        console.log(error)
        next()
    }

}