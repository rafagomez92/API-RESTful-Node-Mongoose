const { Router } = require('express');
const route = Router();


const coches = [
    { id:1, company: 'BMW', model: 'X3', year: '2020' },
    { id:2, company: 'Audi', model: 'A', year: '2022' },
    { id:3, company: 'Mercedes', model: 'Clase A', year: '2022' }
];


route.get('/', (req, res) => {
    res.send(coches);
});

route.post('/', (req, res) => {
    const carId = coches.length + 1;
    const coche = {
        "id": carId,
        "company": "Nissan",
        "model": "A2B2",
        "year": "2023"
    }
    coches.push(coche);
    res.send(coche);
});

module.exports = another