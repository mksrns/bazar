const Order = require('../models/order');

exports.orders_get_all = (req, res, next) => {
    Order.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    order: result.map(res => {
                        return {
                            // name: { 
                            //     firstname: res.name.firstname,
                            //     lastname: res.name.lastname
                            // },
                            rate: res.rate,
                            price: res.price,
                            id:res._id, 
                            created_at:res.created_at,
                            updated_at:res.updated_at,
                            request: {
                                type: 'GET',
                                URL: 'http://localhost:8080/orders/' + res._id
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

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result){
                res.status(200).json({
                    order: result,
                    request: {
                        type: 'GET',
                        description: 'Get all orders',
                        url: "http://localhost:8080/orders/"
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

exports.orders_create_order = (req, res, next) => {
    const order = new Order({
        // name: {
        //     firstname: req.body.firstname,
        //     lastname: req.body.lastname
        // },
        rate: req.body.rate,
        price: req.body.price,
        created_at: new Date() 
    });
    order.save((err,result) => {
        if(err){
            res.status(500).json({msg: 'Failed to add order', error: err});
        } else {
            res.status(201).json({
                message: "orders added Successfully",
                createdData: result,
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/orders/" + result._id
                }
            });
        }
    });
}

exports.orders_update_order = (req, res, next) => {
    var order = { 
        rate: req.body.rate,
        price: req.body.price, 
        updated_at: new Date()
    };

    Order.findByIdAndUpdate({_id:req.params.orderId}, order, {new:true}, function(err, result){
        if(err){ 
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'Order updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/orders/" + result._id
                }
            });
        }
    }); 
}

exports.orders_delete_order = (req, res, next) => {
    Order.remove({_id:req.params.orderId}, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/orders/'
                }
            });
        }
    });
}