const File = require('../models/fileModel');
const fs = require('fs');
const path = require('path');

const uploadFile = async (req, res) => {
    console.log("File upload called");
    console.log(req.file);  

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const newFile = new File({
            orginalname:req.file.originalname,
            filename: req.file.filename, 
            size: req.file.size,         
            mimeType: req.file.mimetype,
            uploadDate: new Date(),      
        });
        await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const downloadFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }
        const filePath = path.join(__dirname, '../uploads', file.filename);
        res.download(filePath, file.filename);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteFile = async (req, res)=>{
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }
        const filePath = path.join(__dirname, '../uploads', file.filename);
        fs.unlinkSync(filePath); 
        await File.findByIdAndDelete(req.params.id); 
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAllUploads = async (req, res) => {
    try {
        const files = await File.find({}, { __v: 0 }).sort({ uploadDate: -1 });
        const formattedFiles = files.map((file) => ({
            id: file._id,
            originalname: file.originalname,
            filename: file.filename,
            size: file.size,
            mimeType: file.mimeType,
            uploadDate: file.uploadDate,
        }));
        res.status(200).json({ files: formattedFiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    uploadFile,
    downloadFile,
    deleteFile,
    getAllUploads
};