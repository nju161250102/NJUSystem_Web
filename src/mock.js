const express = require("express");
const Mock =  require("mockjs");
const router = express.Router();

router.get('/personInfo', (req, res) => {
  res.json({
    name: Mock.Random.first(),
    id: Mock.Random.natural(161250001, 161250222),
  });
});

router.post('/login', (req, res) => {
  res.json(['cas_success'])
});

module.exports = router;
