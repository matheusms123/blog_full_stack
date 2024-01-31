const router = require("express").Router()
const postController = require("../controllers/postController")
const checkToken = require("../helpers/check-token")

const upload = require("../config/multer")


router.route('/create').post(checkToken,upload.single("file"),(req, res) => postController.create(req, res))
router.route("/all").get((req, res) => postController.getAll(req,res))
router.route("/:id").get((req, res) => postController.get(req, res))
router.route("/update").patch(checkToken, upload.single("file"), (req, res) => postController.update(req, res))
router.route("/delete").delete(checkToken, (req, res) => postController.delete(req, res))


module.exports = router