const Merchant = require('../models/merchant');

exports.merchants_get_all = (req, res, next) => {
    Merchant.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    merchant: result.map(res => {
                        return {
                            name: { 
                                firstname: res.name.firstname,
                                lastname: res.name.lastname
                            },
                            username: res.username,
                            merchantImage: res.merchantImage,
                            id:res._id,
                            contactInfo: {
                                address:{
                                    email: res.contactInfo.email,
                                    street: res.contactInfo.address.street,
                                    city: res.contactInfo.address.city,
                                    state: res.contactInfo.address.state,
                                    pincode: res.contactInfo.address.pincode
                                },
                                email:res.contactInfo.email,
                                telephone:{
                                    tel1: res.contactInfo.telephone
                                }
                            },
                            created_at:res.created_at,
                            updated_at:res.updated_at,
                            request: {
                                type: 'GET',
                                URL: 'http://localhost:8080/merchants/' + res._id
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

exports.merchants_get_merchant = (req, res, next) => {
    Merchant.findById(req.params.merchantId, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result){
                res.status(200).json({
                    merchant: result,
                    request: {
                        type: 'GET',
                        description: 'Get all merchants',
                        url: "http://localhost:8080/merchants/"
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

exports.merchants_create_merchant = (req, res, next) => {
    console.log(req.file);
    const merchant = new Merchant({
        name: {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        },
        merchantImage: req.file.path,
        username: req.body.username,
        password: req.body.password,
        created_at: new Date(),
        contactInfo: {
            telephone: [
                req.body.tel1,
                req.body.tel2
            ],
            email: req.body.email,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
            }
        }
    });
    merchant.save((err,result) => {
        if(err){
            res.status(500).json({msg: 'Failed to add merchant', error: err});
        } else {
            res.status(201).json({
                message: "merchants added Successfully",
                createdData: result,
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/merchants/" + result._id
                }
            });
        }
    });
}

exports.merchants_update_merchant = (req, res, next) => {
    console.log(req.file);    
    var merchant = {
        name:{
            firstname:req.body.firstname,
            lastname:req.body.lastname
        },
        username: req.body.username,
        password: req.body.password,
        merchantImage: req.file.path,
        updated_at: new Date(),
        contactInfo: {
            telephone: [
                req.body.tel1,
                req.body.tel2
            ],
            email: req.body.email,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
            }
        }
    };

    Merchant.findByIdAndUpdate({_id:req.params.merchantId}, merchant, {new:true}, function(err, result){
        if(err){ 
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'merchant updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/merchants/" + result._id
                }
            });
        }
    }); 
}

exports.merchants_delete_merchant = (req, res, next) => {
    Merchant.remove({_id:req.params.merchantId}, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'merchant deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/merchants/'
                }
            });
        }
    });
}