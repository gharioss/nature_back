var express = require('express');
const { getAllUsers, getUserById } = require('../model/users');
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

  res.redirect("/form");
});

module.exports = router;
