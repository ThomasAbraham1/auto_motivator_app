const express = require('express');
const path = require("path");
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,)));
app.set("view engine", 'ejs');
const cron = require('node-cron');
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");
const Quote = require('inspirational-quotes');

app.get("/", (req,res) =>{

res.render("index", {});

cron.schedule('02 18 * * *', () => {
    console.log('Running a job at 6:30 at Asia/Kolkata timezone');
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "cta102938@gmail.com",
          pass: "btkovkokiqsiwyod",
        },
      });
      
      async function main() {
        const info = await transporter.sendMail({
          from: 'cta102938@gmail.com', // sender address
          to: ['chatgptthomas@gmail.com','950320104028@gracecoe.org', '950320104027@gracecoe.org', '950320104025@gracecoe.org','950320104021@gracecoe.org'], // list of receivers
          subject: "Daily Quotes", // Subject line
          text: Quote.getRandomQuote(), // plain text body
        //   html: "<b>Hello world?</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
      }
      
      main().catch(console.error);
  },
    {
        scheduled: true,
        timezone: "Asia/Kolkata"
      }
  );
  
});

app.listen(port, (req,res) =>{
    console.log('App listening on 3000')
})
























// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'cta102938@gmail.com',
//     pass: 'btkovkokiqsiwyod'
//   }
// });

// var mailOptions = {
//   from: 'cta102938@gmail.com',
//   to: '950320104028@gracecoe.org',
//   subject: 'Nigga what do you want?',
//   text: `Shut up`
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });