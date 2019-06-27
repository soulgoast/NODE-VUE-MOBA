module.exports = app => {
    const express = require('express')

    const router = express.Router()

    const Category = require('../../models/Category')


    router.post('/categories', async(req, resp) => {
        const model = await Category.create(req.body)
        resp.send(model)
    })

    router.put('/categories/:id', async(req, resp) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        resp.send(model)
    })

    router.delete('/categories/:id', async(req, resp) => {
        await Category.findByIdAndDelete(req.params.id, req.body)
        resp.send({
            success: true
        })
    })
    
    router.get('/categories', async(req, resp) => {
        const items = await Category.find().populate('parent').limit(10)
        resp.send(items)
    })
        
    router.get('/categories/:id', async(req, resp) => {
        const model = await Category.findById(req.params.id)
        resp.send(model)
    })

    app.use('/admin/api', router)
}