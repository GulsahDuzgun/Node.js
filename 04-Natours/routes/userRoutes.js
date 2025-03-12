const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  creatUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controller/userController');
const { signup, login, protect } = require('../controller/authController');

router.post('/signup', signup);
router.post('/login', login);
router.route('/').get(protect, getAllUsers).post(creatUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
