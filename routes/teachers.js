const express = require('express')
const router = express.Router()
const Teacher = require('../models/teachers')

//all teachers route
router.get('/', async(req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name != ""){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const teachers = await Teacher.find(searchOptions)
        res.render('teachers/index', {
            teachers: teachers,
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')
    }
    
})

//new teachers route
router.get('/new', (req, res) => {
    res.render('teachers/new', {teacher: new Teacher() })
})

//create teachers route
router.post('/', async (req, res) =>{
    // res.send(req.body.name)
    const teacher = new Teacher({
        name: req.body.name
    })
    try {
        const newTeacher = await teacher.save()
        // res.redirect(`teacher/${newTeacher.id}`)
        res.redirect('teachers')
    } catch {
        res.render('teachers/new', {
            teacher: teacher,
            errorMessage: 'Error creating teacher'
        })
    }
})

module.exports = router