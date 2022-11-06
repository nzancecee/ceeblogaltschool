const route =require ('express').Router();
const userModel= require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET= process.env.JWT_SECRET;

route.route('/').post(async (req, res, next) => {
    try {
      // grab username and password from request
      const { email, password } = req.body
      // check database for user
      const user = await userModel.findOne({ email })
      const isValidPassword = user === null ? false : await user.isValidPassword(password)
  
      if (!(user && isValidPassword)) {
        return res.status(403).json({
          message: 'Username/password is incorrect',
        })
      }
  
      const userToken = {
        username: user.email,
        id: user._id,
      }
  
      const validityPeriod = '1h'
      const token = jwt.sign(userToken, JWT_SECRET, { expiresIn: validityPeriod })
  
      res.json({ token, username: user.email, name: user.firstName })
    } catch (e) {
      next(e)
    }
  })

  module.exports = route;

