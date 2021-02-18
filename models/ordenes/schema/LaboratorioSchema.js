const { Schema } = require("mongoose");

const LaboratorioSchema = Schema({
    laboratorio: {
        type: String,
        required: true,
    },
});

module.exports = LaboratorioSchema;