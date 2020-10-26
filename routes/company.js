const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { Company } = require('../models/company') 


router.get('/', async(req, res) => {
    const companies = await Company.find()
    res.send(companies)
})

router.get('/:id', async (req, res) => {
    const company = await Company.findById(req.params.id)
    if(!company) return res.status(404).send('No hemos encontrado un fabricante con ese ID')
    res.send(company)
})

router.post('/', async (req, res) => {
    const company = new Company({
        name: req.body.name,
        country: req.body.country
    }) 
    const result = await company.save()
    res.status(201).send(result)
})

router.put('/:id', async (req, res) => {
    const company = Company.findByIdAndUpdate( req.params.id, {    
            company: req.body.company,
            country: req.body.country
    })
    if(!company) {
        return res.status(404).send('El fabricante con ese ID no existe');
    }

    res.status(204).send(company)
})

router.delete('/:id', async (req, res) => {
    const company = Company.findByIdAndDelete(req.params.id)

    if (!company) {
        return res.status(404).send("El fabricante con ese ID no existe y no se puede borrar");
    }
    
    res.status(200).send('Fabricante eliminado');
})


module.exports = router