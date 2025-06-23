import express from 'express'
import productos from './local_db/productos.json' with {type: 'json'}
import {Message} from 'firebase-functions/pubsub'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

//rutas

app.get('/', (req, res)=>{
    res.send('<h1>Prueba</h1>')
})


app.get('/productos', (req, res)=>{
    res.json(productos)
})

app.get('/productos/disponibles', (req, res)=>{

    const productosFiltrados = productos.filter((producto)=>{
        return producto.disponible === true
    })

    res.json(productosFiltrados)
})


app.get('/productos/:id', (req, res)=>{
    const {id} = req.params

    const parsedId = Number(id)

    if(isNaN(parsedId)){
        res.status(400).json({
            message: 'Entrada no valida: El id debe ser un numero'
        })
    }

    const producto = productos.find((producto) =>{
        return producto.id === parsedId
    })

    if(!producto){
        res.status(404).json({
            message: 'No encontrado: El producto no existe.'
        })
    }

    res.json(producto)

})



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
}) 