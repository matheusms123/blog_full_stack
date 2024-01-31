const jwt = require("jsonwebtoken")
const User = require("../model/user")
const Post = require("../model/posts")
const getUserByToken = require("../helpers/get-user-by-token")


const postController = {
    create: async (req, res) => {

        const token = req.header("auth-token")
        const userToken = await getUserByToken(token)
        const userId = userToken._id.toString()

        
        
        const file = req.file

        const post = new Post({
            title: req.body.title,
            description: req.body.description,
            image: file.path,
            userId: userId
        })
        
        try {

            const newPost = await post.save()

            res.json({ error: null, msg: "Post craiado com sucesso!", data: newPost })

        } catch (error) {

            return res.status(400).json({ error: error })
        }

    },
    getAll: async( req, res ) => {
        
        const posts = await Post.find({}).sort([['_id', -1]])

        if(!posts) {
            return res.status(400).json({ error: "Ainda não tem nenhum poste!" })
        }

        try {
            
            res.json({ error: null, posts: posts})

        } catch (error) {

            return res.status(400).json({ error: "Algo deu errado!" })
            
        }
    },
    get: async (req, res) => {

        const id = req.params.id

        const post = await Post.findOne({ _id: id })

        if(!post) {
            return res.status(400).json({ error: "Este poste não está disponivel!"})
        }

        try {
            
            res.json({ error: null, data: post})

        } catch (error) {
            
            return res.status(400).json({ error: "Algo deu errado!" })
        }

    },
    update: async (req, res) => {

        const id = req.body.id

        const token = req.header("auth-token")
        const userToken = await getUserByToken(token)
        const userId = userToken._id.toString()

        const title = req.body.title
        const description = req.body.description
        const file = req.file

        const updatePost = {
            title,
            description,
            image: file.path,
        }

        try {
            const updateData = await Post.findOneAndUpdate({ _id: id, userId: userId }, {$set: updatePost}, { new: true })
            res.json({ error: null, msg: "Atualizado com sucesso! ", data: updateData})
        } catch (error) {
            return res.status(400).json({ error: error })
        }

    },
    delete: async(req, res) => {
        const id = req.body.id

        const token = req.header("auth-token")
        const userToken = await getUserByToken(token)
        const userId = userToken._id.toString()

        const post = await Post.deleteOne({_id: id, userId: userId})

        try {
            res.json({ error: null, msg: "Poste deletado com sucesso!" })
        } catch (error) {
            return res.status(400).json({ errror: error})
        }
    }
}


module.exports = postController