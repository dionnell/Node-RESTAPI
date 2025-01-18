const express = require('express');
const routes = require('./routes')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv').config({path: 'variables.env'})

//Cors permite q un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors')

//conectar con mongo
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_MONGO_URL , {
    useNewUrlParser: true
})

//crear el servidor
const app = express()

//Carpeta Publica
app.use(express.static('uploads'))

//Habilitar el bosy parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//Definir un dominio para recibir las peticiones 
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: (origin, callback) => {
        //Revisar si la peticion viene de un servidor q esta en whiteList
        const existe = whiteList.some(dominio => dominio === origin)
        if(existe) {
            callback(null, true)
        } else {
            callback(new Error('no Permitido por cors'))
        }
    }
}

//habilitar cors
app.use(cors(corsOptions))

//Rutas de la App
app.use('/', routes())

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000

//iniciar app
app.listen(port, host, () => {
    console.log('El servidor esta funcionando')
})