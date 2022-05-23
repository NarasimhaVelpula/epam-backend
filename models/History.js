const mongoose=require('mongoose')

const historySchema=mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    history:{
        type: Array,
        required: true,
        default: []
    }
})

module.exports=mongoose.model('History',historySchema)