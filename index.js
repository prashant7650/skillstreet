const express = require("express")
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

const noterouter = require("./route/note.route")
const { DataBase } = require("./Database/db")


app.get("/server",(req,res)=>{
    res.status(200).send({msg:"server start"})
})
app.use("/note", noterouter)





app.listen(port, () => {
    try {
        DataBase()
        console.log(`Server is running on port${port}`)
    } catch (error) {
        console.error(error)
    }

})