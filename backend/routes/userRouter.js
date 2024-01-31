const router = require("express").Router()
const checkToken = require("../helpers/check-token")
const getUserByToken = require("../helpers/get-user-by-token")
const userController = require("../controllers/userController")



router.route('/register').post((req,res) => userController.create(req, res))
router.route('/login').post((req, res) => userController.login(req, res))
router.route('/update').patch(checkToken,(req, res) => userController.update(req, res))
router.route('/user/:id').get((checkToken) => userController.getUser)

module.exports = router