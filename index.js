const express=require('express')
const mongoose=require('mongoose')

const Posts=require('./routes/posts')
const Auth=require('./routes/auth')
const cors=require('cors')

const app=express()
const PORT=process.env.PORT || 3001
const MONGO_CONNECTION_STRING= "mongodb+srv://nani:epam123@cluster0.rrusc.mongodb.net/?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())
app.use('/auth',Auth)
app.use('/posts',Posts)


mongoose.connect(MONGO_CONNECTION_STRING,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        app.listen(PORT,err=>{
            if(err){
                console.log("Server crashed, Error is "+err)
            }
            else{
                console.log("Server running under port"+PORT)
            }
        })
    })
    .catch((error)=>{console.log(error)});