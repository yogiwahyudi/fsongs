require('dotenv').config()
const cors = require('cors')
const indexRouter = require('./routers')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(indexRouter)

app.listen(port, ()=>{console.log(`server running at port ${port}`)})