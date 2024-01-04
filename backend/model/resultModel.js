const mongoose = require('mongoose')
const resultSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:['true','please add a name value']
    },
    rollno:{
        type:String,
        required:['true','please add a name value']
    },
    // one:{
    //     type:Number,
    //     required:['true','please add a text value']
    // },
    // two:{
    //     type:Number,
    //     required:['true','please add a text value']
    // },
    // three:{
    //     type:Number,
    //     required:['true','please add a text value']
    // }
    options:[
        {
            "Depression":Number,
            "Anxiety":Number,
            "Stress":Number
        }
    ]
},
{
    timestamps:true,
})

module.exports = mongoose.model('Result',resultSchema);