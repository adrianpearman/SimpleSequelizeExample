const express = require('express')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const router = express.Router()
const db = require('../config/database')
const Gig = require('../models/Gig')

// Get gigs
router.get('/', (req, res) => {
    Gig.findAll()
    .then((gigs) => {
        res.render('gigs', {
            gigs
        })
        // res.sendStatus(200)
    })
    .catch((err) => console.log(err))
})

// display the add gig form
router.get('/add', (req,res) => {
    res.render('add')
})


router.get('/search', (req, res) => {
    let { term } = req.query
    term = term.toLowerCase()
    
    Gig.findAll({ where: { technologies: { [Op.like]: `%${term}%`}}})
        .then(gigs => {
            res.render('gigs', {
                gigs
            })
        })
        .catch(err => console.log(err))
})

// Add a gig
router.post('/add', (req, res) => {
    let { title, technologies, budget, description, contact_email } = req.body

    let errors = []

    if(!title){
        errors.push({ text: 'please add a title '})
    }
    if (!technologies) {
        errors.push({ text: 'please add some technologies ' })
    }
    if (!description) {
        errors.push({ text: 'please add a description ' })
    }
    if (!contact_email) {
        errors.push({ text: 'please add a contact email ' })
    }

    if(errors.length > 0){
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            technologies,
            contact_email  
        })
    } else {
        if (!budget) {
            budget = 'Unknown'
        } else {
            budget = `$${budget}`
        }

        technologies = technologies.toLowerCase().replace(/, /g, ',')

        Gig.create({
            title,
            technologies,
            budget,
            description,
            technologies,
            contact_email
        })
            .then((gig) => res.redirect('/'))
            .catch(err => console.log(err))
    }

})

module.exports = router