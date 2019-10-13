const Product = require('../models/product');

exports.products_get_all = (req, res, next) => {
    Product.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    product: result.map(res => {
                        return { 
                            sku: res.sku,
                            productImage: res.productImage,
                            id:res._id, 
                            created_at:res.created_at,
                            updated_at:res.updated_at,
                            request: {
                                type: 'GET',
                                URL: 'http://localhost:8080/products/' + res._id
                            }
                        }
                    })
                });
            } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }            
        }
    });
}

exports.products_get_product = (req, res, next) => {
    Product.findById(req.params.productId, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result){
                res.status(200).json({
                    product: result,
                    request: {
                        type: 'GET',
                        description: 'Get all products',
                        url: "http://localhost:8080/products/"
                    }
                });
            } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }            
        }
    });
}

exports.products_create_product = (req, res, next) => {
    console.log(req.file);
    const product = new Product({ 
        productImage: req.file.path,
        sku: req.body.sku, 
        created_at: new Date(),
    });
    product.save((err,result) => {
        if(err){
            res.status(500).json({msg: 'Failed to add product', error: err});
        } else {
            res.status(201).json({
                message: "products added Successfully",
                createdData: result,
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/products/" + result._id
                }
            });
        }
    });
}

exports.products_update_product = (req, res, next) => {
    console.log(req.file);    
    var product = { 
        sku: req.body.sku, 
        productImage: req.file.path,
        updated_at: new Date(), 
    };

    Product.findByIdAndUpdate({_id:req.params.productId}, product, {new:true}, function(err, result){
        if(err){ 
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'product updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/products/" + result._id
                }
            });
        }
    }); 
}

exports.products_delete_product = (req, res, next) => {
    Product.remove({_id:req.params.productId}, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/products/'
                }
            });
        }
    });
}