var express = require('express');
const { getAllHeight, getAllWidth, getAllDepth, getAllColor, getAllAvailability, getAllOrientation, getAllType } = require('../model/size');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  try {
      const allHeight = await getAllHeight();
      const allWidth = await getAllWidth();
      const allDepth = await getAllDepth();
      const allColor = await getAllColor();
      const allAvailability = await getAllAvailability();
      const allOrientation = await getAllOrientation();
      const allType = await getAllType();
      res.status(200).json({ height: allHeight, width: allWidth, depth: allDepth, color: allColor, availability: allAvailability, orientation: allOrientation, type: allType });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve users' });
  }
});


module.exports = router;
