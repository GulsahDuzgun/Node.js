const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkItem,
} = require('../controller/tourController');

const router = express.Router();

// router.param('id', (req, res, next, val) => {
//   console.log(val);
//   console.log('Param middleware is worked');
//   next();
// });

router.param('id', checkItem);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router; //modeule exports object
