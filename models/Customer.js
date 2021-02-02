const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema({
  name: String,
  surname: String,
  company: String,
  phone: String,
});
module.exports = mongoose.model("Customer", NoteSchema);
