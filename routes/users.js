const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  userInfoSchema,
} = require('../middlewares/validationSchema');
const {
  getMe,
  updateProfile,
} = require('../controllers/users');

router.get('/users/me', getMe);

router.patch('/users/me', celebrate({ body: userInfoSchema }), updateProfile);

module.exports = router;
