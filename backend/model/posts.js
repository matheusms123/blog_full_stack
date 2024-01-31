const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createAt: {
        type: Date
    },
    image: {
        type: String
    },
    userId: {
       type: mongoose.ObjectId
    }
})


const Post = mongoose.model("Post", postSchema)

module.exports = Post 