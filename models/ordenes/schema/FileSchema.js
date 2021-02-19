const { Schema } = require("mongoose");

const FileSchema = Schema({
    type: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    }
}, { _id: false });

module.exports = FileSchema;