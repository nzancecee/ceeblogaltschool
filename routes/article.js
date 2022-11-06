const express = require('express');
const articleModel = require('../models/article');
const user = require('../models/user');
const {authenticateToken} = require('../middleware/auth');

const articleRoute= express.Router();

// get one blog with its id
articleRoute.route("/get/:id").get((req, res) => {
    articleModel.findOneAndUpdate({id: req.params.id, state: "published"}, { $inc: { read_count: 1 }})
        .then((article) => {
            user.findOne({id: article.author}).then((userData) => {
                res.status(201).send({userData, article})
            }).catch((e) => {
                throw e
            })
        }).catch((err) => {
            res.status(400).send(err)
        })
})

// get all published blogs
articleRoute.route("/all").get((req, res) => {
    articleModel.find({state: "published"})
        .then((data) => {
            res.status(201).send(data)
        }).catch((err) => {
            res.status(400).send(err)
        })
})

// get all blogs by current loggedin user
articleRoute.get("/my/all", authenticateToken, (req, res) => {
    const filter = req.query.filter
    var query = {author: req.user.id}
    if (filter != null){
        query.state = filter
    }
    articleModel.find(query)
        .then((data) => {
            res.status(201).send(data)
        }).catch((err) => {
            res.status(400).send(err)
        })
})

// create new blog (Logged in users only)
articleRoute.post("/new", authenticateToken, (req, res) => {
    const article = req.body

    articleModel.create(article)
        .then((data) => {
            res.status(201).send({
                message: "Article created as "+data.state,
                data: data
            })
        }).catch((err) => {
            res.status(400).send(err)
        })
})

// update blog by passing its id (Logged in users only)
articleRoute.post("/update/:id", authenticateToken, (req, res) => {
    const {title, description, state} = req.body
    articleModel.findOneAndUpdate({id: req.params.id, author: req.user.id, title, description, state})
    .then((data) => {
        res.status(201).send({
            message: data.id+" blog updated",
            new_data: data
        })
    }).catch((err) => {
        res.status(400).send(err)
    })
})


// delete blog by passing its id (Logged in users only)
articleRoute.delete("/delete/:id", authenticateToken, (req, res) => {
    articleModel.findOneAndDelete({id: req.params.id, author: req.user.id})
        .then((data) => {
            res.status(201).send({
                message: data.id+" blog deleted",
            })
        }).catch((err) => {
            res.status(400).send(err)
        })
})

module.exports = articleRoute