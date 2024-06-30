const mongoose = require('mongoose');
const itemsSchema = new mongoose.Schema({
    title:String,
    desc:String
});
module.exports = mongoose.model("data-users",itemsSchema)