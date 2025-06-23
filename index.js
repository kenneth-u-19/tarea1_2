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



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
}) 