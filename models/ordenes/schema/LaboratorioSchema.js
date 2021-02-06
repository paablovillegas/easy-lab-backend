const { Schema } = require("mongoose");

const LaboratorioSchema = Schema({
    laboratorio: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = LaboratorioSchema;