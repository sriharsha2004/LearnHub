const mongoose = require('mongoose');

const EmployeeIDSchema = new mongoose.Schema({
    EmployeeId: {
        type: String,
        required: true
    }
},{timestamps : true});

module.exports = mongoose.model('EmployeeId', EmployeeIDSchema);