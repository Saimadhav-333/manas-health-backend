const mongoose = require('mongoose');
const teacherSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please add a name']
    },
    password:{
        type:String,
        required:[true,'Please add a name']
        
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Teacher',teacherSchema);