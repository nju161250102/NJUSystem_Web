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

router.get('/card/info', (req, res) => {
  res.json({
    name: Mock.Random.first(),
    balance: 100,
    bankCardNo: 6222024301000008888,
    status: '正常',
  })
});
router.get('/card/record', (req, res) => {
  res.json([
    {"transTime":"17-05-17 11:59","transName":"POS消费","amount":"-6.5","balance":10.3,"termName":"食堂小炒1"},
    {"transTime":"17-05-17 07:43","transName":"POS消费","amount":"-2.0","balance":16.8,"termName":"精品早点1"},
    {"transTime":"17-05-17 07:35","transName":"网费充值","amount":"-1.0","balance":18.8,"termName":"A区多媒体机"},
    {"transTime":"17-05-16 18:17","transName":"网费充值","amount":"-1.0","balance":19.8,"termName":"图书馆多媒体机"},
    {"transTime":"17-05-16 17:35","transName":"POS消费","amount":"-4.0","balance":20.8,"termName":"精品早点3"},
    {"transTime":"17-05-16 17:08","transName":"POS消费","amount":"-1.57","balance":24.8,"termName":"南京10幢浴室"},
    {"transTime":"17-05-16 16:44","transName":"圈存转账","amount":"+8.0","balance":26.37,"termName":"A区多媒体机"},
    {"transTime":"17-05-15 18:17","transName":"网费充值","amount":"-1.0","balance":19.8,"termName":"图书馆多媒体机"},
    {"transTime":"17-05-15 17:35","transName":"POS消费","amount":"-4.0","balance":20.8,"termName":"精品早点3"},
    {"transTime":"17-05-15 17:08","transName":"POS消费","amount":"-1.57","balance":24.8,"termName":"南京10幢浴室"},
    {"transTime":"17-05-15 16:44","transName":"圈存转账","amount":"+8.0","balance":26.37,"termName":"A区多媒体机"}
    ])
});
module.exports = router;
