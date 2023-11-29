var express = require('express');
const { getAllPaintings } = require('../model/paintings');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  try {
      const allPaintings = await getAllPaintings();
      console.log('hello');
      res.status(200).json(allPaintings);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve paintings' });
  }
});

module.exports = router;
