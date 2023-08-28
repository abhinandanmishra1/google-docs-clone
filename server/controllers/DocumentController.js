const Document = require("../models/Document");

async function findOrCreateDocument(id) {
  const document = await Document.findById(id);

  if (document) {
    return document;
  }

  const newDocument = await Document.create({
    _id: id,
    data: {},
    name: "",
  });

  return newDocument;
}

async function updateDocument(id, data) {
  await Document.findByIdAndUpdate(id, { ...data });
}

module.exports = {
  findOrCreateDocument,
  updateDocument,
};
