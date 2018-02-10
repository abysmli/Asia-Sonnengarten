var express = require('express');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    csrfToken: req.csrfToken()
  });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'abysmli@gmail.com',
      pass: 'Universe42*'
    }
  }));
  var mailOptions = {
    from: 'abysmli@gmail.com',
    to: 'info@asia-sonnengarten.com',
    subject: '东方红预定座位',
    text: `姓名：${req.body.name}\n邮箱：${req.body.email}\n电话：${req.body.phone}\n人数：${req.body.numGuests}\n时间：${req.body.reservDate}\n`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send("");
    }
  });
});

module.exports = router;
