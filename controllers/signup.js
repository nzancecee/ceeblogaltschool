const router = require('express').Router()
const user = require('../models/user')

const createUser = async (req, res, next) => {
  try {
    // grab details from the request
    const { firstName, lastName, email, password } = req.body
    // create user object
    const newUser = new user({
      firstName,
      lastName,
      email,
      password,
    })
    // save to database
    const createdUser = await newUser.save()
    // return response
    return res.status(201).json({
      status: true,
      data: createdUser,
    })
  } catch (error) {
    next(error)
  }
}

router.route('/').post(createUser)

module.exports = router
