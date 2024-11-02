const express = require('express');
const { handleUserSingup, handleUserLogin} = require('../controllers/user');

const router = express.Router();

router.post('/', handleUserSingup);

router.post('/login', handleUserLogin);

module.exports = router;