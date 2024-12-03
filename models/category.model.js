// category name and description

const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })
//hear convert name singular to plural like category to categorys
module.exports = mongoose.model("Category",categorySchema)