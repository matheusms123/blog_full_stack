const express   = require("express")
const cors      = require("cors")
const mongoose  = require("mongoose")

const app = express()


const name = 'blog'
const port = 5000

app.use(express.json())
app.use(cors())

const routes = require("./routes/router")
app.use("/", routes)

mongoose.connect(
    `mongodb://localhost/${name}`
)


app.listen(port, () => {
    console.log(`Está rodando na porta: ${port}`)
})