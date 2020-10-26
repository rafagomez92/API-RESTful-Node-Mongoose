const express = require('express');
const app = express();
const coche = require('./routes/another');
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.get('/car/company', (req, res) => {
    const company = coches.map(({ company }) => company);
    res.status(200).send(company);
});
app.get('/car/model', (req, res) => {
    const model = coches.map(({ model }) => model);
    res.status(200).send(model);
});

app.get('/car/id/:id', (req, res) => {
    const idCar = req.params.id;
    const car = coches.find(({ id }) => id === parseInt(idCar));
    res.status(200).send(car);
});

app.post('/car', (req, res) => {
    const idCar = coches.length + 1;
    const coche = {
        "id": idCar,
        "company": "Nissan",
        "model": "MIA2",
        "year": "2022"
    }
    coches.push(coche);
})

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
});
