const express = require('express')
const router = express.Router();

router.get('/', function (req, res) {
  res.send('Ini masih di Index')
})
module.exports = router;
