const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const usuarioMid = require('../middleware/validarUsuario.middleware')
const { Usuario } = require('../db/models')

router.post('/', usuarioMid)
router.put('/', usuarioMid)


router.get('/', async (req, res) => {
    const usuarios = await Usuario.findAll()
    res.json({ usuarios: usuarios })
})

router.get('/:id', async (req, res) => {
    const usuarios = await Usuario.findByPk(req.params.id)
    res.json({ usuarios: usuarios })
})

router.post('/', async (req, res) => {
    const usuario = await Usuario.create(req.body)
    res.json({ msg: "Usuário adicionado com sucesso", userId: usuario.id })
})

router.put('/', async (req, res) => {
    const id = req.query.id
    const usuario = await Usuario.findByPk(id)
    if (usuario) {
        usuario.email = req.body.email
        usuario.senha = req.body.senha
        await usuario.save()
        res.json({ msg: "Usuário atualizado com sucesso" })
    } else {
        res.status(404).json({ msg: "Usuário não encontrado" })
    }
})

router.delete('/', async (req, res) => {
    const id = req.query.id
    const usuario = await Usuario.findByPk(id)

    if (usuario) {
        await usuario.destroy()
        res.json({ msg: "Usuário deletado com sucesso" })
    } else {
        res.status(404).json({ msg: "Usuário não encontrado" })
    }
})

module.exports = router
