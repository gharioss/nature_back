var express = require('express');
const { getAllPaintings, getPaintingById, getPaintingFiltered, insertPaintingData } = require('../model/paintings');
var router = express.Router();
const multer = require('multer');
const path = require('path');

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

router.post('/filterPaintings', async (req, res) => {
  const { availability, prices, color, sizes, orientation, type } = req.body;

  try {
  
    const paintingsFiltered = await getPaintingFiltered(availability, prices, color, sizes, orientation, type);
    res.status(200).json(paintingsFiltered);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve paintings' });
  }
});


// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


// Route to handle file upload
router.post('/upload', upload.array('files'), async (req, res) => {

  const files = req.files;
  const paintingInformation = req.body;

  const postPainting = await insertPaintingData(paintingInformation);

  console.log(files)

  if(files.length !== 0) {

    const fileRecords = files.map(file => [
      file.filename,
      file.path,
      file.mimetype
    ]);
  
    const postFilesofPainting = await insertPaintingData(postPainting, fileRecords);

    console.log(postFilesofPainting)
  }
  
});

module.exports = router;
