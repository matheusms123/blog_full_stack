const router = require("express").Router()


const userRouter = require("../routes/userRouter")
router.use("/user", userRouter)

const postRouter = require("../routes/postRouter")
router.use('/post', postRouter)


module.exports = router