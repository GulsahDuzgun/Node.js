const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  creatUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controller/userController');

router.route('/').get(getAllUsers).post(creatUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
