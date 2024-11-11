var express = require('express');
var router = express.Router();
let userData = {}; 
router.post('/create', (req, res) => {
    userData = req.body; 
    res.json({ message: `User ${userData.username} was created successfully!`, data: userData });
});
router.get('/profile', (req, res) => {
    res.json(userData); 
});
module.exports = router;