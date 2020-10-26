const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { Company } = require('../models/company')
const Car = require('../models/car') 
const authorize = require('../middleware/role')
const Role = require('../helpers/role')
const auth = require('../middleware/auth')

router.get('/', [auth, authorize([Role.Admin])], async (req, res) => {    
    const cars = await Car.find()    
    res.send(cars)    
});

router.get('/:id', async (req, res) => {
    const car = await Car.findById(req.params.id)
    if(!car) return res.status(404).send('No existe el coche con ese ID')
    res.send(car)
})

// Modelo de datos embebidos
router.post('/', [    
    check('year').isLength({ min: 3 }),
    check('model').isLength({ min: 3 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const company = await Company.findById(req.body.company)
    if(!company) return res.status(400).send('No tenemos ese fabricante')

    const car = new Car({
        company: company,
        model: req.body.model,        
        year: req.body.year,        
        sold: req.body.sold,        
        price: req.body.price,        
        extras: req.body.extras        
    }) 

    const result = car.save()    
    res.status(201).send(result)
})

// Modelo de datos normalizados
/*router.post('/', [    
    check('model').isLength({ min: 3 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const car = new Car({
        company: req.body.company,
        model: req.body.model,        
        year: req.body.year,        
        sold: req.body.sold,        
        price: req.body.price,        
        extras: req.body.extras        
    }) 

    const result = car.save()    
    res.status(201).send(result)
})
*/

router.put('/:id', [    
    check('model').isLength({ min: 3 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    
    
    const car = await Car.findByIdAndUpdate(req.params.id, {
        company: req.body.company,
        model: req.body.model,        
        year: req.body.year,        
        sold: req.body.sold,        
        price: req.body.price,        
        extras: req.body.extras            
    })

    if(!car) {
        return res.status(404).send('El coche con ese ID no existe')
    }
    
    res.status(204).send(car)
})


router.delete('/:id', async (req, res) => {
    const car = await Car.findByIdAndDelete(req.params.id)
    if (!car) {
        return res.status(404).send("El coche con ese ID no existe y no se puede borrar")
    }
    
    res.status(200).send('Coche eliminado')

});

module.exports = router
