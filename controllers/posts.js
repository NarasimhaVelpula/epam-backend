const Posts=require('../models/Posts')

const getPosts=async(req,res)=>{
    console.log("---------------------Getting Posts----------------------")
    try{
    const {email,id}=req.verified
    const posts=await Posts.find({ownerId:{$ne:id},status:true})
    res.status(200).send(posts)
    }
    catch(err){
        console.log(err);
        res.status(500).send("unable to fetch posts")
    }
}

const createPost=async(req,res)=>{
    console.log("-----------------Creating Post----------------")
    try{
        const {email,id}=req.verified
        const {rooms,size,address,rent,deposit}=req.body
        const post=new Posts({
            ownerId:id,
            rooms,size,address,rent,deposit
        })
        const newPost=await post.save()
        console.log("Post Saved Succesfully : "+newPost._id)
        res.status(200).send("Post Saved Successfully")
    }
    catch(err){
        console.log(err)
        res.status(500).send("unable to save post")
    }
}

const showInterest=async(req,res)=>{
    console.log("--------------Creating Interest---------------")
    try{
        const {email,id}=req.verified;
        const {id:postId}=req.params;
        const {mobileNumber}=req.body;
        const post=await Posts.findById({_id:postId,status: true})
        if(post){
            post.interests.push({
                email,
                mobileNumber
            })
            const newPost=await Posts.findByIdAndUpdate(post._id,post)
            console.log("interst updated for post "+post._id)
            res.status(200).send("interest Created")
        }
        else{
            console.log("Post not available "+postId)
            res.status(404).send("Post is not available")
        }

    }
    catch(err){
        console.log(err);
        res.status(500).send("unable to create interest for post")
    }
}

const makeInactive=async(req,res)=>{
    console.log("------------------Making Post Inactive-----------------------")
    try{                            

        const {id,email}=req.verified
        const {id:postId}=req.params
        const requiredPost=await Posts.findById(postId)
        if(requiredPost.ownerId==id){
            requiredPost.status=false
            await Posts.findByIdAndUpdate(postId,requiredPost)
            console.log("Post "+postId +" Made inactive")
            res.status(200).send("Inactivated")
        }
        else{
            res.status(400).send("Not authorized")
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send("something will went wrong always, dont know why will find out")
    }
}

const makeActive=async(req,res)=>{
    console.log("------------------Making Post active-----------------------")
    try{                            

        const {id,email}=req.verified
        const {id:postId}=req.params
        const requiredPost=await Posts.findById(postId)
        if(requiredPost.ownerId==id){
            requiredPost.status=true
            await Posts.findByIdAndUpdate(postId,requiredPost)
            console.log("Post "+postId +" Activated")
            res.status(200).send("Post Activated")
        }
        else{
            res.status(400).send("Not authorized")
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send("something will went wrong always, dont know why will find out")
    }
}

const getInterests=async(req,res)=>{
    console.log("------------getting post interests---------------")
    try{
        const {id,email}=req.verified
        const {id:postId}=req.params
        const requiredPost=await Posts.findById(postId)
        if(requiredPost.ownerId==id){
            console.log("sending Interests")
            res.status(200).send(requiredPost.interests)
        }
        else{
            res.status(400).send("Not Authorised")
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send("Something went wrong")
    }
}

const selectATenant=async(req,res)=>{
    console.log("------------------Selecting A tenant-----------------------")
    try{                            

        const {id,email}=req.verified
        const {id:postId}=req.params
        const requiredPost=await Posts.findById(postId)
        if(requiredPost.ownerId==id){
            requiredPost.status=false
            await Posts.findByIdAndUpdate(postId,requiredPost)
            console.log("Post "+postId +" Made inactive")
            res.status(200).send("Tenant Selected")
        }
        else{
            res.status(400).send("Not authorized")
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send("something will went wrong always, dont know why will find out")
    }
}



module.exports={getPosts,createPost,showInterest,makeActive,makeInactive,getInterests,selectATenant}