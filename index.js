const mongoose = require('mongoose')
const express = require('express')
const app = express()
const dotEnv = require('dotenv')
const car = require('./routes/cars')
const auth = require('./routes/auth')
const user = require('./routes/user')
const company = require('./routes/company')
const sale = require('./routes/sale')

app.use(express.json())
app.use('/api/cars', car)
app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/company', company)
app.use('/api/sale', sale)

dotEnv.config()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})

mongoose.connect('mongodb://localhost/carsdb', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('No se ha conectado a MongoDB'))