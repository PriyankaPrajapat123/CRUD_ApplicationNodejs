const mongoose = require('mongoose');
const itemsSchema = new mongoose.Schema({
    itemname:String,
    discription:String,
    color:String,
    version:String,
    date:String
});
const studentSchema = new mongoose.Schema({
    fullName:String,
    rollNo:{ type: String, unique: true },
    items:[itemsSchema],

});
module.exports = mongoose.model("data-users",studentSchema)