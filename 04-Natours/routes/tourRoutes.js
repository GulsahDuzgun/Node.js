const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} = require('../controller/tourController');

const router = express.Router(); //sub-router

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router; //modeule exports object
