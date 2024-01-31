const jwt = require('jsonwebtoken')
const User = require("../model/user")
const bcrypt = require("bcrypt")
const getUserByToken = require('../helpers/get-user-by-token')

const userController = {
    create: async(req, res) => {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword

        if(name == null || email == null || password == null || confirmpassword == null ) {
            return res.status(400).json({ error: "Preencha os dados nescessarios! " })
        }

        const userExists = await User.findOne({ email: email })

        if(userExists) {
            return res.status(400).json({ error: "Este usuario já está cadastrado!" })
        }

        if (password != confirmpassword ) {
            return res.status(400).json({ error: "As senhas não conferem!" })
        }

        const salt = await bcrypt.genSalt(12)
        const passHash = await bcrypt.hash(password, salt)

        const user = new User({
            name: name,
            email: email,
            password: passHash
        })

        try {
            
            const newUser = await user.save()

            const token = jwt.sign(
                {
                    name: newUser.name,
                    id: newUser._id
                },
                "segredo"
            )

            res.json({ error: null, msg: "Ussuario cadastrado com sucesso! ", token: token, userId: newUser._id})

        } catch (error) {
            
            return res.status(400).json({ error: error})
        }

    },

    login: async (req, res) => {
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({ email: email })

        if(!user) {
            return res.status(400).json({ error: "Este usuario não existe!" })
        }

        const checkPass = bcrypt.compare(password, user.password)

        if(!checkPass) {
            return res.status(400).json({ error: "Usuario ou senha invalidos!" })
        }

        try {
            
            const token = jwt.sign(
                {
                    name: user.name,
                    id: user.id 
                },
                "segredo"
            )

            res.json({ error: null, token: token, data: user})
        } catch (error) {
            return res.status(400).json({ error: error })
        }
    },
    update: async (req, res) => {
        const token = req.header("auth-token")

        const userToken = await getUserByToken(token)

        const userId = userToken._id.toString()

        const userReq = req.body.id

        if(userReq != userId) {
            return res.status(400).josn({ error: "Não altorizado!" })
        }

        const updateData = {
             name: req.body.name,
             email: req.body.email
        }


        if(password != confirmpassword ) {
            return res.jons({ error: "As senhas não conferem!" })
        } else if( password == confirmpassword && password != null ) {
            const salt = bcrypt.genSalt(12)
            const passHah = bcrypt.hash(password, salt)

            updateData.password = passHah
        }

        try {
            
            const updateUser = await User.findByIdAndUpdate({ _id: userId}, { $set: updateData }, { new: true })

            res.json({ error: null, msg: "Usuario atualizado com sucesso!", data: updateUser })
        } catch (error) {
            return res.status(400).json({ error: error})
        }


        
    },

    getUser: async (req, res) => {
        const id = req.params.id

        const user = await findOne({ _id: id }, {password: 0 })

        try {
            res.json({ error: null, user })
        } catch (error) {
            return res.status.json({ error: error })
        }

    }
}
module.exports = userController