const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const secrets = require('../config/secrets')
// import Users model
const User = require('../models/User')

router.get('/test', async (req, res) => {
  const resp = await User.find()
  console.log(resp)
   res.status(200).json({message: 'Users route works'})
})

router.post('/register',  (req, res) => {
  // implement registration
  const newUser = {username: req.body.username, password: req.body.password}
  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash;
  User.save(newUser).then(user => {
    res.status(201).json(user)
  }).catch(err => {
    res.status(500).json({message: `Unable to save the user in the database. ${err.message}`})
  })
  
});

router.post('/login', (req, res) => {
  // implement login
  const userCred = {username: req.body.username, password: req.body.password};
  User.findbByUserName(userCred.username).then(user => {
    if (bcrypt.compareSync(userCred.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token
      })
    }


 
    else {
      res.status(401).json({message:'Invalid credentials'})
    }
  }).catch(err => {
    res.status(500).json({message: err.message})
  })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
