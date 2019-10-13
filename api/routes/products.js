const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAdminAuth = require('../middlewares/check-adminAuth');
const ProductsController = require('../controllers/products');

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

//Fetch all product
router.get('/', checkAdminAuth, ProductsController.products_get_all);

//Fetch Individual product
router.get('/:productId', checkAdminAuth, ProductsController.products_get_product);

//Insert product
router.post('/', checkAdminAuth, upload.single('productImage'), ProductsController.products_create_product);

//Update product
router.patch('/:productId', checkAdminAuth, upload.single('productImage'), ProductsController.products_update_product);

//Delete product
router.delete('/:productId', checkAdminAuth, ProductsController.products_delete_product);

module.exports = router;