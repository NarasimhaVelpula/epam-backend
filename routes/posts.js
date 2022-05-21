const router=require('express').Router()
const validation=require('./TokenValidation')

const {getPosts,createPost,showInterest,makeActive,makeInactive,selectATenant, getInterests}=require('../controllers/posts')

router.get('/',validation,getPosts);
router.post('/createPost',validation,createPost);
router.post('/showInterest/:id',validation,showInterest);  // mobile number in body
router.post('/makeInactive/:id',validation,makeInactive);
router.post('/makeActive/:id',validation,makeActive);
router.get('/getInterests/:id',validation,getInterests);
router.post('/selectTenant/:id',validation,selectATenant);

module.exports= router
