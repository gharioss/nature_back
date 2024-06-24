var express = require('express');
const { getAllUsers, getUserById, registerUser, loginUser } = require('../model/users');
const bcrypt = require("bcrypt")
const saltRounds = 10
var router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

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

router.post("/register", async (req, res) => {
  const userInformations = {'first_name': req.body.formData.first_name,
                            'last_name': req.body.formData.last_name,
                            'email': req.body.formData.email,
                            'stay_logged_in': req.body.formData.stay_logged_in};

  const userPassword = req.body.formData.password


  try {
    const hash = await bcrypt.hash(userPassword, saltRounds);
    userInformations.password = hash;
    await registerUser(userInformations);
    const token = jwt.sign({ userId: user.guid }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ guid: user.guid, token: token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error registering user', error: err });
  }

});

router.post("/login", async (req, res) => {
  const userInformations = {'email': req.body.formData.email,
                            'password': req.body.formData.password};

  const user = await loginUser(userInformations);
  if(user != 'Error') {
      const token = jwt.sign({ userId: user.guid_user }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ guid: user.guid_user, token: token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;
