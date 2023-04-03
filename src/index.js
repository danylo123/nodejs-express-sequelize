const express = require('express')
const rotaUsuario = require('./rotas/usuario.rota.js')
const rotaPost = require('./rotas/posts.rota.js')

const app = express()
app.use(express.json())

app.use('/usuarios', rotaUsuario)

app.use('/posts', rotaPost)

app.get('/', (req, res) => {
    res.json({ msg: "Hello do express" })
})

app.listen(8081, () => {
    console.log('Servidor rodando na porta 8081')
})