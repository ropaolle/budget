const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User');
const Category = require('../models/Category');
const Service = require('../models/Service');
const Type = require('../models/Type');
const Expense = require('../models/Expense');

class HandlerGenerator {
  // eslint-disable-next-line
  login(req, res) {
    console.log('HALLÅ');
    const { username, password } = req.body;
    // For the given username fetch user from DB
    const mockedUsername = 'admin';
    const mockedPassword = 'password';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        const token = jwt.sign(
          { username },
          config.secret,
          { expiresIn: '24h' } // expires in 24 hours
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token,
        });
      } else {
        res.send(403).json({
          success: false,
          message: 'Incorrect username or password',
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request',
      });
    }
  }

  // eslint-disable-next-line
  index(req, res) {
    res.json({
      success: true,
      message: 'Index page',
    });
  }
}

const router = express.Router();

// apiPost('/createUser', { username: 'ropaolle', password: 'pass1234', email: 'ropaolle@gmail.com' });

const handlers = new HandlerGenerator();
router.post('/login2', handlers.login);

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.authenticate(email, password, async (err, user) => {
    if (err) return res.json({ err });

    const allData = await Promise.all([
      Type.find({}),
      Category.find({}),
      Service.find({}),
      Expense.distinct('description'),
    ]);

    const settings = {
      types: allData[0],
      categories: allData[1],
      services: allData[2],
      autocomplete: allData[3],
    };

    res.json({ user, settings });
  });
});

module.exports = router;
