const express = require('express');
const paymentRoutes = require('./server/payment/payment.route');
const buyerRoutes = require('./server/buyer/buyer.route');
const cardRoutes = require('./server/card/card.route');
const clientRoutes = require('./server/client/client.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/client', clientRoutes);
router.use('/payment', paymentRoutes);
router.use('/buyer', buyerRoutes);
router.use('/card', cardRoutes);

module.exports = router;
