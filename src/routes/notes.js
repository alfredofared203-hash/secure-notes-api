const express = require('express');
const router = express.Router();
const controller = require('../controllers/notes.controller');

router.post('/login', controller.login);
router.get('/notes', controller.getNotes);

module.exports = router;