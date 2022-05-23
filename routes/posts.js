const router=require('express').Router()
const validation=require('./TokenValidation')

const {getPosts,createPost,showInterest,makeActive,makeInactive,selectATenant, getInterests,getPost}=require('../controllers/posts')
const {createPostHistory,showInterestHistory}=require('../controllers/history')

router.get('/',validation,getPosts);
router.post('/createPost',validation,createPost,createPostHistory);
router.post('/showInterest/:id',validation,showInterestHistory,showInterest);  // mobile number in body
router.post('/makeInactive/:id',validation,makeInactive);
router.post('/makeActive/:id',validation,makeActive);
router.get('/getInterests/:id',validation,getInterests);
router.post('/selectTenant/:id',validation,selectATenant);
router.get('/post/:id',validation,getPost)

module.exports= router
