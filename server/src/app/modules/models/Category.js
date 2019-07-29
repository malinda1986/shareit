const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    Images: [{Name: String, URL: String, Type: String}],
    Status: {type: String, required: true, 'enum': ['ACTIVE', 'DELETED', 'HIDE'], index: true},
});

const CategoryModal = mongoose.model('categories', categorySchema);
module.exports = CategoryModal;
