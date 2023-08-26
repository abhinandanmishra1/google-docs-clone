const { Schema, model } = require("mongoose");

const DocumentSchema = new Schema({
    _id: String,
    data: Object
})

const Document = model("Document", DocumentSchema);

module.exports = Document