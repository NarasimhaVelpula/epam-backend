const mongoose=require('mongoose')
const PostSchema=mongoose.Schema({
    ownerId:{
        type: String,
        required: true
    },
    size:{
        type: Number,
        required: true
    },
    rooms:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    rent:{
        type: Number,
        required: true
    },
    deposit:{
        type: Number,
        required: true
    },
    interests:{
        type: Array,
        required: true,
        default:[]
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports=mongoose.model('Posts',PostSchema)