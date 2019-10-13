const Category = require('../models/category');

exports.categories_get_all = (req, res, next) => {
    Category.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    category: result.map(res => {
                        return { 
                            categoryName: res.categoryName,
                            categoryImage: res.categoryImage,
                            id:res._id,
                            created_at:res.created_at,
                            updated_at:res.updated_at,
                            request: {
                                type: 'GET',
                                URL: 'http://localhost:8080/categories/' + res._id
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

exports.categories_get_category = (req, res, next) => {
    Category.findById(req.params.categoryId, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result){
                res.status(200).json({
                    category: result,
                    request: {
                        type: 'GET',
                        description: 'Get all categories',
                        url: "http://localhost:8080/categories/"
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

exports.categories_create_category = (req, res, next) => {
    console.log(req.file);
    const category = new Category({ 
        categoryName: req.body.categoryName,
        categoryImage: req.file.path, 
        created_at: new Date()
    });
    Category.save((err,result) => {
        if(err){
            res.status(500).json({msg: 'Failed to add category', error: err});
        } else {
            res.status(201).json({
                message: "categories added Successfully",
                createdData: result,
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/categories/" + result._id
                }
            });
        }
    });
}

exports.categories_update_category = (req, res, next) => {
    console.log(req.file);    
    var category = { 
        categoryName: req.body.categoryName, 
        categoryImage: req.file.path,
        updated_at: new Date() 
    };

    Category.findByIdAndUpdate({_id:req.params.categoryId}, category, {new:true}, function(err, result){
        if(err){ 
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'category updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/categories/" + result._id
                }
            });
        }
    }); 
}

exports.categories_delete_category = (req, res, next) => {
    Category.remove({_id:req.params.categoryId}, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'category deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/categories/'
                }
            });
        }
    });
}