const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    orginalname:{type:String,required:true},
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    mimeType: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);