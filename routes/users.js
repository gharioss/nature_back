var express = require('express');
const { getAllUsers, getUserById, registerUser } = require('../model/users');
const bcrypt = require("bcrypt")
const saltRounds = 10
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  try {
      const allUsers = await getAllUsers();
      res.status(200).json(allUsers);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    console.log(userId)
  
    const userById = await getUserById(userId);
    res.status(200).json(userById);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

router.post("/login", async (req, res) => {
  const userInformations = [req.body.email, req.body.password];

  const user = await login(userInformations);
  if (!user.message) {
    req.session.user = user;
  }
});

router.post("/register", async (req, res) => {
  const userInformations = {'first_name': req.body.values.first_name,
                            'last_name': req.body.values.last_name,
                            'email': req.body.values.email,
                            'stay_logged_in': req.body.values.stay_logged_in};

  const userPassword = req.body.values.password


  try {
    const hash = await bcrypt.hash(userPassword, saltRounds);
    userInformations.password = hash;
    await registerUser(userInformations);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error registering user', error: err });
  }

});

module.exports = router;
