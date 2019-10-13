const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAdminAuth = require('../middlewares/check-adminAuth');
const CategoriesController = require('../controllers/categories');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});

//Fetch all category
router.get('/', checkAdminAuth, CategoriesController.categories_get_all);

//Fetch Individual category
router.get('/:categoryId', checkAdminAuth, CategoriesController.categories_get_category);

//Insert category
router.post('/', checkAdminAuth, upload.single('categoryImage'), CategoriesController.categories_create_category);

//Update category
router.patch('/:categoryId', checkAdminAuth, upload.single('categoryImage'), CategoriesController.categories_update_category);

//Delete category
router.delete('/:categoryId', checkAdminAuth, CategoriesController.categories_delete_category);

module.exports = router;