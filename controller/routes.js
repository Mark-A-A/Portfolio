var express = require('express');
var router = express.Router();

router.get("*", function(req,res){
  res.sendFile(process.cwd() + "/public/index.html");
})

router.get('/', function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

router.post('/contact', function (req, res) {
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "me@gmail.com",
          pass: "application-specific-password"
      }
  });

  //Mail options
  mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'markawai.dev@gmail.com',
      subject: 'Mark Awai Portfolio Contact Form from Heroku',
      text: req.body.message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
      }
      //Yay!! Email sent
      else {
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      }
  });
});


module.exports = router;
// router.get('/', function (req, res) {                    //Home Page response
//   console.log("Hello client user..On the homepage");
//   console.log(`Current directory: ${process.cwd()}`);
//   //res.send('Hello World');
//   res.sendFile(process.cwd() + '/views/home.html');
// })

// router.get('/blog', function (req, res) {
//   console.log("On the blog page.");
//   console.log(`Current directory: ${process.cwd()}`);
//   //res.send('Hello World');
//   res.sendFile(process.cwd() + '/views/blog.html');
// });
//
// router.get('/portfolio', function (req, res) {
//   console.log("On the Portfolio page.");
//   console.log(`Current directory: ${process.cwd()}`);
//   //res.send('Hello World');
//   res.sendFile(process.cwd() + '/views/my_portfolio.html');
// });
