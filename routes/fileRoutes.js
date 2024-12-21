const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const { uploadFile, downloadFile, deleteFile,getAllUploads } = require('../controllers/fileController');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);

router.get('/download/:id', downloadFile);

router.delete('/delete/:id', deleteFile);
router.get('/uploads', getAllUploads);

module.exports = router;