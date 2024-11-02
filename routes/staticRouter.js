const express = require('express');
const URL = require('../models/url');
const {restrictTo} = require('../middleware/auth');

const router = express.Router();

router.get('/', restrictTo(["NORMAL"]), async (req, res) => {
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render('index', {
        Urls: allUrls,
    });
});

router.get('/admin/urls', restrictTo(["ADMIN", "ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('admin-urls', {
        Urls: allUrls,
    });
});

router.get('/singup', (req, res) => {
    return res.render('singup');
});

router.get('/login', (req, res) => {
    return res.render('login');
});

module.exports = router;