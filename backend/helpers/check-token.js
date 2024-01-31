const jwt = require("jsonwebtoken")

const checkToken = (req, res, next) => {

    const token = req.header("auth-token")

    if(!token ) {
        return res.status(400).json({ error: "Acesso negado!" })
    }

    const verify = jwt.verify(token, "segredo")

    req.user = verify

    next()

}

module.exports = checkToken