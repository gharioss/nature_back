var express = require('express');
const { getAllPaintings, getPaintingById } = require('../model/paintings');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  try {
      const allPaintings = await getAllPaintings();
      res.status(200).json(allPaintings);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve paintings' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const paintingId = parseInt(req.params.id);
  
    const paintingById = await getPaintingById(paintingId);
    res.status(200).json(paintingById);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve paintings' });
  }
});

module.exports = router;
