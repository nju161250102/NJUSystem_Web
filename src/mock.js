const request = require('request');
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
  res.json(['cer_success'])
});
router.get('/login/cer_code', (req, res) => {
  let opts = {url: 'http://cer.nju.edu.cn/amserver/verify/image.jsp'};
  request.get(opts).pipe(res);
});

module.exports = router;
