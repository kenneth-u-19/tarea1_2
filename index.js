import express from 'express'
import productos from './local_db/productos.json' with {type: 'json'}
import {Message} from 'firebase-functions/pubsub'
import fs from 'node:fs/promises';

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

app.delete('/productos/:id', async (req, res)=>{
    const { id } = req.params

    const productoId = Number(id)

    const index = productos.findIndex(producto => producto.id === productoId)

    if (index === -1) {
    return res.status(404).json({
      message: 'No encontrado: Producto no existe'
    });
  }

  productos.splice(index, 1)

  try {
    await fs.writeFile('./local_db/productos.json', JSON.stringify(productos, null, 2));
    res.json({
      message: 'Película eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al guardar los cambios',
      error: error.message
    });
  }
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
}) 