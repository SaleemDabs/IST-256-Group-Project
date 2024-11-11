var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//POST to create new user listing
router.post('/create', (req, res) => {
  const userData = req.body;
  console.log('User Data Received:', userData);
  res.json({ message: `User ${userData.username} was created successfully!`, data: userData });
});
module.exports = router;