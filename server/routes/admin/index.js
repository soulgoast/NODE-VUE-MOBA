module.exports = app => {
    const express = require('express')

    const router = express.Router({
        mergeParams: true
    })

    router.post('/', async(req, resp) => {
        const model = await req.Model.create(req.body)
        resp.send(model)
    })

    router.put('/:id', async(req, resp) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        resp.send(model)
    })

    router.delete('/:id', async(req, resp) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        resp.send({
            success: true
        })
    })
    
    router.get('/', async(req, resp) => {
        const queryOptions = {}
        if(req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }

        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        resp.send(items)
    })
        
    router.get('/:id', async(req, resp) => {
        const model = await req.Model.findById(req.params.id)
        resp.send(model)
    })

    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)
}