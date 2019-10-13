const express = require('express');
const router = express.Router(); 
const checkAdminAuth = require('../middlewares/check-adminAuth');
const OrdersController = require('../controllers/orders'); 

//Fetch all order
router.get('/', checkAdminAuth, OrdersController.orders_get_all);

//Fetch Individual order
router.get('/:orderId', checkAdminAuth, OrdersController.orders_get_order);

//Insert order
router.post('/', checkAdminAuth, OrdersController.orders_create_order);

//Update order
router.patch('/:orderId', checkAdminAuth, OrdersController.orders_update_order);

//Delete order
router.delete('/:orderId', checkAdminAuth, OrdersController.orders_delete_order);

module.exports = router;