const router = require('express').Router();
const userController = require('../controllers/userController.js');
const auth = require('../middleware/auth.js');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/refresh_token', userController.refreshToken);

router.get('/infor', auth, userController.getUser);

module.exports = router;

//a
