const mongoose=require('mongoose')
const resultSchema = mongoose.Schema({

    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:'User'
    // },
    one:{
        type:Number,
        required:['true','please add a text value']
    },
    two:{
        type:Number,
        required:['true','please add a text value']
    },
    three:{
        type:Number,
        required:['true','please add a text value']
    }
},
{
    timestamps:true,
})

module.exports = mongoose.model('Result',resultSchema);